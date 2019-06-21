import { Container } from 'inversify';
import { Repository } from '../core/interfaces/repository';
import { Survey } from '../models/survey';
import { User } from '../models/user';
import { SurveyRepository } from '../repositories/survey.repository';
import { RegistrationRepository } from '../repositories/registration.repository';
import { Registration} from '../dto.models/registration';
import { Authentication} from '../dto.models/authentication';

export const TYPES = {
    Survey: Symbol.for('Survey'),
    Registration: Symbol.for('Registration'),
    Authentication: Symbol.for('Authentication')
};


export class RepositoryProvider {
    public static bindRepositories(container: Container) {
        container.bind<Repository<Survey>>(TYPES.Survey).to(SurveyRepository);
        container.bind<Repository<Registration>>(TYPES.Registration).to(RegistrationRepository);
    }
}
