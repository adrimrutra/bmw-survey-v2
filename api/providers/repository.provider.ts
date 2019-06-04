import { Container } from 'inversify';
import { IRepository } from '../core/interfaces/i.repository';
import { Survey } from '../models/survey';
import { SurveyRepository } from '../repositories/survey.repository';

export const TYPES = {
    Survey: Symbol.for('Survey'),
};


export class RepositoryProvider {
    public static bindRepositories(container: Container) {
        container.bind<IRepository<Survey>>(TYPES.Survey).to(SurveyRepository);
    }
}
