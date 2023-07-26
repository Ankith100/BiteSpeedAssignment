# BiteSpeedAssignment
 -> I have completed the Assignment and hosted the api on Railway.app server.
 -> it has two end points  - 1. POST /addcontact - to add new contacts.
                             2. POST /identify - to get contacts common to given mail as mentioned in the assignment.

-> json body to add contact-
{
	id            *:         1                   
  phoneNumber   :        "123456"
  email         :       "lorraine@hillvalley.edu"
}
* means it's required

-> json body for post req /identify:
{
  "email":"mcfly@hillvalley.edu",
  "phoneNumber":"123456"
}


