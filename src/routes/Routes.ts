import { Router } from 'express';
import { SurveysController } from '../controllers/SurveysController';
import { UserControllers } from '../controllers/UserController';

const router = Router();

router.post('/', new UserControllers().create);
router.post('/surveys', new SurveysController().create);

export { router };