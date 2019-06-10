import { Container } from 'inversify';
import { Repository } from '../core/interfaces/repository';
import { Survey } from '../models/survey';
import { User } from '../models/user';
import { SurveyRepository } from '../repositories/survey.repository';
import { UserRepository } from '../repositories/user.repository';

export const TYPES = {
    Survey: Symbol.for('Survey'),
    User: Symbol.for('User')
};


export class RepositoryProvider {
    public static bindRepositories(container: Container) {
        container.bind<Repository<Survey>>(TYPES.Survey).to(SurveyRepository);
        container.bind<Repository<User>>(TYPES.User).to(UserRepository);
    }
}
