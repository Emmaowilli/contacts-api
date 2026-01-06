const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectToDb } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Connect to MongoDB first
connectToDb(() => {
  console.log('Database connected');

  // Use contacts routes after DB is ready
  app.use('/contacts', contactsRoutes);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});


