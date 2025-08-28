import createHttpError from "http-errors";
import { ContactCollection } from "../db/models/contact.js";


export const checkOwner = async (req, res, next) => {
    const { user } = req;
    const { id } = req.params;

    if (!user) {
        next(createHttpError(401, 'Not authorized'));
        return;
    }

    const contact = await ContactCollection.findOne({
            _id: id,
            userId: user._id
    });

    if (!contact) {
            return next(createHttpError(403, 'Forbidden'));
        }

    next();
    };