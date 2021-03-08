import { EntityRepository, Repository } from "typeorm";
import { SurveysUsers } from "../models/SurveyUsers";

@EntityRepository(SurveysUsers)
class surveysUsersRepositories extends Repository<SurveysUsers> {}

export { surveysUsersRepositories };
