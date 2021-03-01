import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { userRepositories } from '../repositories/UserRepositories';

class UserControllers {

    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const userRepository = getCustomRepository(userRepositories);

        const userAlreadyExists = await userRepository.findOne({ email, });

        if( userAlreadyExists){
            return res.status(400).json({
                date: null,
                status: false,
                description: "O E-mail: " + email + "já existe na API"
            })
        }

        const createUser = userRepository.create({ name, email });

        await userRepository.save(createUser); 

        return res.status(200).json(
            {
                date: createUser,
                status: true,
                description: "O Usuário foi criado com sucesso"
            }
        );
    }

}

export { UserControllers };
