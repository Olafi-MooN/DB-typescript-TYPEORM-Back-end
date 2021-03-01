import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(userRepositories)
class userRepositories extends Repository<User> {}

export { userRepositories };