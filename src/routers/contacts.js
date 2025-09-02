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
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get('/', errWrapper(getContactsController));

router.get('/:id', isValidId, errWrapper(getContactByIdController));

router.post('/', upload.single('photo'), validateBody(createContactSchema), errWrapper(createContactController));

router.patch('/:id', upload.single('photo'), isValidId, validateBody(updateContactSchema), errWrapper(updateContactController));

router.delete('/:id', upload.single('photo'), isValidId, errWrapper(deleteContactController));


export default router;