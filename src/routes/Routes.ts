import { Router } from 'express';
import { UserControllers } from '../controllers/UserController';

const router = Router();

router.post('/', new UserControllers().create);

export { router };