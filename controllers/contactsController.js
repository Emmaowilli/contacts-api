const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL CONTACTS
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .find();

    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE CONTACT BY ID
const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .find({ _id: contactId });

    const contact = await result.toArray();
    res.status(200).json(contact[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};

