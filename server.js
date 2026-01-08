require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectToDb } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectToDb(() => {
  app.use('/contacts', contactsRoutes);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



