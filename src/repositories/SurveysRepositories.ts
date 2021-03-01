import { EntityRepository, Repository } from "typeorm";
import { Surveys } from "../models/Surveys";

@EntityRepository(Surveys)
class surveysRepositories extends Repository<Surveys> {}

export { surveysRepositories };
