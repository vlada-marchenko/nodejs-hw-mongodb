import { Router } from "express";
import { getContactsController, getContactByIdController } from "../controllers/contacts.js";
import { errWrapper } from "../utils/errWrapper.js";
import { createContactController } from "../controllers/contacts.js";
import { updateContactController } from "../controllers/contacts.js";
import { deleteContactController } from "../controllers/contacts.js";

const router = Router();

router.get('/', errWrapper(getContactsController));

router.get('/:id', errWrapper(getContactByIdController));

router.post('/', errWrapper(createContactController));

router.patch('/:id', errWrapper(updateContactController));

router.delete('/:id', errWrapper(deleteContactController));

export default router;