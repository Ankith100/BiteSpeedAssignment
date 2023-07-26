const express = require("express");
const router = express.Router();
const Contact = require("../Models/contactModel");

router.route("/addcontact").post(async (req, res) => {
    
    const {id, phoneNumber, email } = req.body;
    let linkedId, linkPrecedence;
    

    //Find the contact with the same email or phone number
    let temp1,temp2;
    if(phoneNumber) {
        temp1 = await Contact.findOne({phoneNumber:phoneNumber, linkPrecedence:"primary"})
    }
    if(email) {
        temp2 = await Contact.findOne({email:email, linkPrecedence:"primary"})
    }

    //If both are found, compare the createdAt time and set the linkedId to the one with the older createdAt time
    if(temp1 && temp2) {
        if(temp1.createdAt < temp2.createdAt) {
            linkedId = temp1.id,
            linkPrecedence = "secondary"
        }
        else {
            linkedId = temp2.id,
            linkPrecedence = "secondary"
        }
    } 
    else if(temp1) {
        linkedId = temp1.id,
        linkPrecedence = "secondary"
    }
    else if(temp2) {
        linkedId = temp2.id,
        linkPrecedence = "secondary"
    }
    else{
        linkedId = -1,
        linkPrecedence = "primary"
    }
    const newContact = new Contact({
        id,
        phoneNumber,
        email,
        linkedId,
        linkPrecedence,
        createdAt:Date.now(),
        updatedAt:Date.now()
    });
    await newContact.save();

    res.status(201).json(newContact);
});

router.route("/identify").post(async (req, res) => {

    const {phoneNumber, email } = req.body;
    let primaryContact, primaryIndex;
    let temp1,temp2,temp;

    // Get all the contacts with the same email or phone number
    if(phoneNumber) {
        temp1 = await Contact.find({phoneNumber:phoneNumber})
    }
    if(email) {
        temp2 = await Contact.find({email:email})
    }
    temp = temp1.concat(temp2)
    if(temp.length == 0) {
        res.status(404).json({
            contact: {
                "primaryContatctId": 100,
                "emails": [email],
                "phoneNumbers": [phoneNumber],
                "secondaryContactIds": []
            }
        })
        return;
    }
    //finding the primary contact
    for(let i=0;i<temp.length;i++) {
        if(temp[i].linkPrecedence == "primary" && primaryContact == undefined) {
            primaryContact = temp[i]
            primaryIndex = i;
        }
        else if(temp[i].linkPrecedence == "primary" && primaryContact != undefined && temp[i].createdAt < primaryContact.createdAt) {
            primaryContact = temp[i]
            primaryIndex = i;
        }
    }

    let primaryContactId, emails, phoneNumbers, secondaryContactIds;
    
    primaryContactId = primaryContact.id;
    emails = [primaryContact.email];
    phoneNumbers = [primaryContact.phoneNumber];
    secondaryContactIds = [];

    for(let i=0;i<temp.length;i++) {
        if(i != primaryIndex) {
            secondaryContactIds.push(temp[i].id);
            if(temp[i].email) {
                emails.push(temp[i].email);
            }
            if(temp[i].phoneNumber) {
                phoneNumbers.push(temp[i].phoneNumber);
            }
        }
    }
    let contact = {primaryContactId, emails, phoneNumbers, secondaryContactIds}
    res.status(201).json({contact});
});

module.exports = router;

