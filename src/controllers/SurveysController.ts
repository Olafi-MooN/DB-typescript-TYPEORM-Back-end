import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { surveysRepositories } from '../repositories/SurveysRepositories';

class SurveysController {

    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const surveyRepository = getCustomRepository(surveysRepositories);

        const surveysAlreadyExistes = await surveyRepository.findOne({ title });
        
        if(surveysAlreadyExistes){
            return res.status(400).json({
                date: null,
                status: false,
                description: "O titulo: " + title + "já existe na API"
            })
        }

        const createSurvey = surveyRepository.create({
            title,
            description
        })

        await surveyRepository.save(createSurvey);

        return res.status(200).json({ 
            date: createSurvey,
            status: true,
            description: "Pesquisa criada com sucesso!"
        });

    }

    async show(req: Request, res: Response){
        const surveysRepository = getCustomRepository(surveysRepositories);

        const listSurveys = await surveysRepository.find();

        if (!listSurveys){
            return res.status(400).json({
                date: null,
                status: false,
                description: "Nenhuma lista encontrada"
            })
        }
        
        return res.status(200).json({
            date: listSurveys,
            status: true,
            description: "As pesquisas foram listadas"
        })
    }

}

export { SurveysController };
