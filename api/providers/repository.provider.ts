import { Container } from 'inversify';
import { Repository } from '../core/interfaces/repository';
import { Survey } from '../models/survey';
import { SurveyRepository } from '../repositories/survey.repository';

export const TYPES = {
    Survey: Symbol.for('Survey'),
};


export class RepositoryProvider {
    public static bindRepositories(container: Container) {
        container.bind<Repository<Survey>>(TYPES.Survey).to(SurveyRepository);
    }
}
