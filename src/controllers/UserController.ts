import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserControllers {

    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const userRepository = getRepository(User);

        const userAlreadyExists = userRepository.findOne({ email })

        if(userAlreadyExists){
            return res.json({
                date: null,
                status: false,
                description: "O Usuário já existe na API"
            })
        }

        const createUser = userRepository.create({ name, email });

        await userRepository.save(createUser); 

        return res.json(
            {
                date: createUser,
                status: true,
                description: "O Usuário foi criado com sucesso"
            }
        );
    }

}

export { UserControllers };