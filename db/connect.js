const MongoClient = require('mongodb').MongoClient;

let database;

const connectToDb = (callback) => {
  if (database) {
    return callback();
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db();
      console.log('Connected to MongoDB');
      callback();
    })
    .catch((err) => {
      console.error(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  connectToDb,
  getDb
};

