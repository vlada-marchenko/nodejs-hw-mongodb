import { getAllContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { createContact } from '../services/contacts.js';
import { updateContact } from '../services/contacts.js';
import { deleteContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';


export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const userId = req.user._id;
    const contacts = await getAllContacts({
        userId,
        page,
        perPage,
        sortBy,
        sortOrder
    });

    res.status(200).json({
        data: contacts,
        message: "Successfully found contacts!"
    });
};

export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const contact = await getContactById(userId, id);

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

    const userId = req.user._id;
    const payload = {
        name, 
        phoneNumber, 
        email: email || null, 
        isFavorite: isFavorite || false, 
        contactType
    };

    const contact = await createContact(userId, payload);

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

    const userId = req.user._id;
    const payload = {
        name, 
        phoneNumber, 
        email: email || null, 
        isFavorite: isFavorite || false, 
        contactType
    };

    const contact = await updateContact(userId, req.params.id, payload);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        data: contact,
        message: `Successfully patched a contact!`
    });
};

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const contact = await deleteContact(userId, id);

    if (!contact) {
        throw createHttpError(404, `Contact not found`);
    }

    res.status(204).send();
};