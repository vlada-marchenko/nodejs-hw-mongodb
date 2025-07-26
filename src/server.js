import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import configDotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import mongoose from "mongoose";
import { ContactCollection } from "./db/models/contact.js";

configDotenv.config();

const PORT = Number(getEnvVar('PORT')) || 3000;

export const setUpServer = () => {
const app = express();

app.use(cors());
app.use(pino({
    transport: {
        target: 'pino-pretty'
    }
}));
app.use(express.json());

app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        data: contacts,
        message: "Successfully found contacts!"
    });
} );

app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
        res.status(404).json({
            message: `Contact with id ${id} not found`
        });
        return;
    }

    res.status(200).json({
        data: contact,
        message: `Successfully found contact with id ${id}!`
    });


});


app.get("/__debug", async (req, res) => {
  const info = {
    db: mongoose.connection.name,
    collections: (await mongoose.connection.db.listCollections().toArray()).map(c => c.name),
    count: await ContactCollection.estimatedDocumentCount(),
    sample: await ContactCollection.findOne().lean(),
  };
  res.json(info);
});


app.all('/{*splat}', (req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    });
} );

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: 'Internal server error',
        error: err.message
    });
} );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


};

