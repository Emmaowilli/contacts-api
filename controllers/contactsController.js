const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contacts = await db
      .collection('contacts')
      .find()
      .toArray();

    if (contacts.length === 0) {
      return res.status(200).json([]); // Explicitly return empty array if no contacts
    }

    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error fetching all contacts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET contact by ID
const getSingleContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const contact = await db
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error('Error fetching single contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST new contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Basic validation (optional but good practice; assignment doesn't require but helps prevent errors)
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = mongodb.getDb();
    const response = await db
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json({ id: response.insertedId });
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Basic validation
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
      return res.status(400).json({ message: 'All fields are required for update' });
    }

    const db = mongodb.getDb();
    const result = await db
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};




