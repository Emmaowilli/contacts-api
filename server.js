require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/contacts', contactsRoutes);

// Root route for basic health check
app.get('/', (req, res) => {
  res.send('Contacts API is running');
});

// Start server AFTER DB connects
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to initialize database. Server not started.');
  } else {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
});






