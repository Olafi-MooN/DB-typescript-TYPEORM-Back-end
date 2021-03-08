import { Router } from 'express';
import { SendEmailsController } from '../controllers/SendEmailsController';
import { SurveysController } from '../controllers/SurveysController';
import { UserControllers } from '../controllers/UserController';

const router = Router();

router.post('/', new UserControllers().create);
router.delete('/delete', new UserControllers().delete);

router.post('/surveys', new SurveysController().create);
router.get('/surveys/list', new SurveysController().show);

router.post('/sendEmail', new SendEmailsController().execute);


export { router };