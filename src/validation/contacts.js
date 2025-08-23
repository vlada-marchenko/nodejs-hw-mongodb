import Joi from 'joi';

export const createContactSchema = Joi.object({
name: Joi.string().min(3).max(20).required(),
phoneNumber: Joi.number().required(),
email: Joi.string().min(3).max(20),
isFavorite: Joi.boolean(),
contactType: Joi.string().min(3).max(20).required()
});

export const updateContactSchema = Joi.object({
name: Joi.string().min(3).max(20),
phoneNumber: Joi.number(),
email: Joi.string().min(3).max(20),
isFavorite: Joi.boolean(),
contactType: Joi.string().min(3).max(20)
});

