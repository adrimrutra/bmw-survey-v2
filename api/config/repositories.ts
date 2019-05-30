import { Container } from 'inversify';
import { Repository } from '../core/repository';
import { Survey } from '../models/survey';
import { SurveyRepository } from '../repositories/survey.repository';



export const TYPES = {
    Survey: Symbol.for('Survey'),

};

export function bindRepositories(container: Container) {
    container.bind<Repository<Survey>>(TYPES.Survey).to(SurveyRepository);

}
