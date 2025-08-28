import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { loginUserController, logoutUserController, refreshUsersSessionController, registerUserController } from "../controllers/auth.js";
import { errWrapper} from '../utils/errWrapper.js';
import { validateBody } from "../middlewares/validateBody.js";


const router = Router();

router.post('/register', validateBody(registerUserSchema), errWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), errWrapper(loginUserController));

router.post('/logout', errWrapper(logoutUserController));

router.post('/refresh', errWrapper(refreshUsersSessionController));

export default router;