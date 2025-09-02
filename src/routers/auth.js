import { Router } from "express";
import { loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import { loginUserController, logoutUserController, refreshUsersSessionController, registerUserController, requestResetEmailController, resetPasswordController } from "../controllers/auth.js";
import { errWrapper} from '../utils/errWrapper.js';
import { validateBody } from "../middlewares/validateBody.js";


const router = Router();

router.post('/register', validateBody(registerUserSchema), errWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), errWrapper(loginUserController));

router.post('/logout', errWrapper(logoutUserController));

router.post('/refresh', errWrapper(refreshUsersSessionController));

router.post('/request-reset-email', validateBody(requestResetEmailSchema), errWrapper(requestResetEmailController));

router.post('/reset-password', validateBody(resetPasswordSchema), errWrapper(resetPasswordController));

export default router;