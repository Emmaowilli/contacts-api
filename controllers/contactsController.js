const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find();

    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single contact by ID
const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!result) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount === 0) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount === 0) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};

