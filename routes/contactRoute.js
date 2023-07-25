const express = require("express");
const router = express.Router();
const Contact = require("../Models/contactModel");

router.route("/addcontact").post((req, res) => {
    

    res.status(201).json("addcontact");
});

router.route("/identify").post((req, res) => {
    res.status(201).json("identified");
});

module.exports = router;

