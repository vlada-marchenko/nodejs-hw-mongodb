import { Router } from "express";
import { getContactsController, getContactByIdController } from "../controllers/contacts.js";
import { errWrapper } from "../utils/errWrapper.js";
import { createContactController } from "../controllers/contacts.js";
import { updateContactController } from "../controllers/contacts.js";
import { deleteContactController } from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkOwner } from "../middlewares/checkRoles.js";

const router = Router();

router.use(authenticate);

router.get('/', checkOwner, errWrapper(getContactsController));

router.get('/:id', checkOwner, isValidId, errWrapper(getContactByIdController));

router.post('/', checkOwner, validateBody(createContactSchema), errWrapper(createContactController));

router.patch('/:id', checkOwner, isValidId, validateBody(updateContactSchema), errWrapper(updateContactController));

router.delete('/:id', checkOwner, isValidId, errWrapper(deleteContactController));

export default router;