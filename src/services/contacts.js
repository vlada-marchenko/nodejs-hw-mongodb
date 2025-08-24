import { SORT_ORDER } from "../constants/index.js";
import { ContactCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id' }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactQuery = ContactCollection.find();
    const contactCount = await ContactCollection.find().merge(contactQuery).countDocuments();

    const contacts = await contactQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

    const paginationData = calculatePaginationData(contactCount, perPage, page);
    return {
        data: contacts,
        ... paginationData
    };
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