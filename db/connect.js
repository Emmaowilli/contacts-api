// db/connect.js
const { MongoClient } = require('mongodb');

let _db;
let _client; // Keep reference to close old connections

const initDb = async (callback) => {
  if (_db) {
    console.log('Closing old DB connection...');
    await _client.close(); // Force close stale connection
    _db = null;
    _client = null;
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI not defined in environment variables');
    }

    console.log('Connecting to MongoDB with URI:', uri.replace(/\/\/.*@/, '//<hidden>@')); // Log masked URI for debug

    _client = new MongoClient(uri);
    await _client.connect();
    _db = _client.db(); // Uses DB from URI
    console.log('Connected to MongoDB successfully. Database name:', _db.databaseName);
    callback(null, _db);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};

