### GET all contacts
GET http://localhost:8080/contacts

### GET contact by ID
GET http://localhost:8080/contacts/PASTE_ID_HERE

### POST new contact
POST http://localhost:8080/contacts
Content-Type: application/json

{
  "firstName": "Sarah",
  "lastName": "Connor",
  "email": "sarah@example.com",
  "favoriteColor": "black",
  "birthday": "1991-02-10"
}

### PUT update contact
PUT http://localhost:8080/contacts/PASTE_ID_HERE
Content-Type: application/json

{
  "firstName": "Sarah",
  "lastName": "Connor",
  "email": "sarah.updated@example.com",
  "favoriteColor": "red",
  "birthday": "1991-02-10"
}

### DELETE contact
DELETE http://localhost:8080/contacts/PASTE_ID_HERE
