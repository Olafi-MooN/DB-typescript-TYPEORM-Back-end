import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';
import { surveysRepositories } from '../repositories/SurveysRepositories';
import { surveysUsersRepositories } from '../repositories/SurveysUsersRepositories';

class SendEmailsController {

    async execute(req: Request, res: Response){
        const  { email, survey_id } = req.body;

        const userRepository = getCustomRepository(UserRepositories);
        const surveysRepository = getCustomRepository(surveysRepositories);
        const surveysUserRepository = getCustomRepository(surveysUsersRepositories);

        const userAlreadyExists = await userRepository.findOne({ email });
        
        if (!userAlreadyExists) {
            return res.status(400).json({
                date: null,
                status: false,
                description: "O E-mail: " + email + " não existe"
            });
        }
        
        const surveysIdAlreadyExists = await surveysRepository.find({ id: survey_id });
 
        if (!surveysIdAlreadyExists) {
            return res.status(400).json({
                date: null,
                status: false,
                description: "A pesquisa " + survey_id + " Não existe na API"
            });
        }

        const createSurveyUser = await surveysUserRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        });

        await surveysUserRepository.save(createSurveyUser);

        return res.status(201).json({
            date: createSurveyUser,
            status: true,
            description: "E-mail enviado com sucesso!"
        });
    }

}

export { SendEmailsController };