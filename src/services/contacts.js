import { ContactCollection } from "../db/models/contact.js";

export const getAllContacts = async () => {
    const contacts = await ContactCollection.find();
    return contacts;
};

export const getContactById = async (id) => {
    const contact = await ContactCollection.findById(id);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactCollection.create(payload);
    return contact;
 };

export const updateContact = async (id, payload, options = {}) => {
    const rawResult = await ContactCollection.findByIdAndUpdate( { _id: id }, payload, {
        new: true,
        includeResultMetadata: true,
        ...options
    });

    if (!rawResult || !rawResult.value) {
        return null;
    }

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject?.updatedExisting),
 };
};

export const deleteContact = async (id) => {
    const contact = await ContactCollection.findByIdAndDelete({ _id: id });
    return contact;
};