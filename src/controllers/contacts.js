import { getAllContacts, getContactById } from './services/contacts.js';
import createHttpError from 'http-errors';
import { createContact } from './services/contacts.js';
import { updateContact } from '../services/contacts.js';
import { deleteContact } from '../services/contacts.js';


export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        data: contacts,
        message: "Successfully found contacts!"
    });
};

export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
        throw createHttpError(404, `Contact not found`);
    }

    res.status(200).json({
        data: contact,
        message: `Successfully found contact with id ${id}!`
    });
};

export const createContactController = async (req, res) => {
    const { name, phoneNumber, email, isFavorite, contactType } = req.body;

    if(!name || !phoneNumber || !contactType) {
        throw createHttpError(400, 'Name, phone number, and contact type are required fields');
    }

    const payload = {
        name, 
        phoneNumber, 
        email: email || null, 
        isFavorite: isFavorite || false, 
        contactType
    };

    const contact = await createContact(payload);

    res.status(201).json({
        status: 201,
        data: contact,
        message: "Successfully created contact!"
    });
};

export const updateContactController = async (req, res) => {
    const { name, phoneNumber, email, isFavorite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
        throw createHttpError(400, 'Name, phone number, and contact type are required fields');
    }

    const payload = {
        name, 
        phoneNumber, 
        email: email || null, 
        isFavorite: isFavorite || false, 
        contactType
    };

    const contact = await updateContact(req.params.id, payload);

    if (!contact || !contact.contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        data: contact.contact,
        message: `Successfully patched a contact!`
    });
};

export const deleteContactController = async (req, res) => {
    const { id } = req.params;

    const contact = await deleteContact(id);

    if (!contact) {
        throw createHttpError(404, `Contact not found`);
    }

    res.status(204).send();
};