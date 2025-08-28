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
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.USER), errWrapper(getContactsController));

router.get('/:id', checkRoles(ROLES.USER), isValidId, errWrapper(getContactByIdController));

router.post('/', checkRoles(ROLES.USER), validateBody(createContactSchema), errWrapper(createContactController));

router.patch('/:id', checkRoles(ROLES.USER), isValidId, validateBody(updateContactSchema), errWrapper(updateContactController));

router.delete('/:id', checkRoles(ROLES.USER), isValidId, errWrapper(deleteContactController));

export default router;