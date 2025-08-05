import { Router } from "express";
import { getContactsController, getContactByIdController } from "../controllers/contacts";
import { errWrapper } from "../utils/errWrapper.js";
import { createContactController } from "../controllers/contacts.js";
import { updateContactController } from "../controllers/contacts";
import { deleteContactController } from "../controllers/contacts.js";

const router = Router();

router.get('/contacts', errWrapper(getContactsController));

router.get('/contacts/:id', errWrapper(getContactByIdController));

router.post('/contacts', errWrapper(createContactController));

router.patch('/contacts/:id', errWrapper(updateContactController));

router.delete('/contacts/:id', errWrapper(deleteContactController));

export default router;