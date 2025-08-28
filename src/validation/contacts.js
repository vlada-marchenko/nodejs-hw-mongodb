import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
name: Joi.string().min(3).max(20).required(),
phoneNumber: Joi.number().required(),
email: Joi.string().min(3).max(20),
isFavorite: Joi.boolean(),
contactType: Joi.string().min(3).max(20).required(),
userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
        return helper.message('Parent should be a valid mongoose element');
    }
    return true;
})
});

export const updateContactSchema = Joi.object({
name: Joi.string().min(3).max(20),
phoneNumber: Joi.number(),
email: Joi.string().min(3).max(20),
isFavorite: Joi.boolean(),
contactType: Joi.string().min(3).max(20)
});

