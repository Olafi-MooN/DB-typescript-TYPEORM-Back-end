import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';
import { sendEmail } from '../services/nodemailer';

class UserControllers {

    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const userRepository = getCustomRepository(UserRepositories);

        const userAlreadyExists = await userRepository.findOne({ email });

        if(userAlreadyExists){
            return res.status(400).json({
                date: null,
                status: false,
                description: "O E-mail: " + email + "já existe na API"
            })
        }

        const createUser = userRepository.create({ name, email });

        await userRepository.save(createUser);

        const configSendEmail = {
            object: {
                emailTo: email,
                subject: 'Nodemailer',
                subjectDescription: 'A sua conta foi criada com sucesso!',
                html: `
                    <h1>Seja bem vindo!</h1>
                    <p>Ao serviço de e-mail nodemailer</p>
                `
            }
        }
        
        const reultSendEmail = await sendEmail(configSendEmail);

        return res.status(200).json({
                date: createUser,
                sendEmail: reultSendEmail,
                status: true,
                description: "O Usuário foi criado com sucesso"
            });
    }

    async delete(req: Request, res: Response) {
        const { email } = req.body;

        const userRepository = getCustomRepository(UserRepositories);

        const userAlreadyExists = await userRepository.findOne({ email });

        if(!userAlreadyExists){
            return res.status(400).json({
                date: null,
                status: false,
                description: "O E-mail: " + email + " não existe"
            })
        }

        const deleteUser = await userRepository.delete({ email });

        return res.status(200).json(
            {
                date: deleteUser,
                status: true,
                description: "O Usuário foi deletado com sucesso"
            }
        );
    }

}

export { UserControllers };
