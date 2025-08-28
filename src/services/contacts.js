import { SORT_ORDER } from "../constants/index.js";
import { ContactCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ userId, page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id' }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactQuery = ContactCollection.find({ userId });
    const contactCount = await ContactCollection.find().merge(contactQuery).countDocuments();

    const contacts = await contactQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

    const paginationData = calculatePaginationData(contactCount, perPage, page);
    return {
        data: contacts,
        ... paginationData
    };
};

export const getContactById = async (userId, id) => {
    const contact = await ContactCollection.findOne({ _id: id, userId });
    return contact;
};

export const createContact = async (userId, payload) => {
    const contact = await ContactCollection.create({ ...payload, userId });
    return contact;
 };

export const updateContact = async (userId, id, payload) => {
    const contact = await ContactCollection.findOneAndUpdate(
        { _id: id, userId },
        payload,
        { new: true }
    );
    return contact;
};


export const deleteContact = async (userId, id) => {
    const contact = await ContactCollection.findOneAndDelete({ _id: id, userId });
    return contact;
};