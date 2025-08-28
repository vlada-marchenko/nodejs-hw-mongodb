import createHttpError from "http-errors";
import { ROLES } from '../constants/index.js';
import { ContactCollection } from "../db/models/contact.js";


export const checkRoles = (...roles) => async (req, res, next) => {
    const { user } = req;
    if (!user) {
        next(createHttpError(401));
        return;
    }

    const { role } = user;
    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
        const { userId } = req.params;
        if (!userId) {
            next(createHttpError(403));
            return;
        }

        const contact = await ContactCollection.findOne({
            _id: userId,
            userId: user._id
        });

        if (contact) {
            next();
            return;
        }
    }

    next(createHttpError(403));
    };