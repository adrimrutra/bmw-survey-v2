import { Container } from 'inversify';
import { Repository } from '../core/interfaces/repository';
import { Survey } from '../models/survey';
import { User } from '../models/user';
import { SurveyRepository } from '../repositories/survey.repository';
import { RegistrationRepository } from '../repositories/registration.repository';
import { AuthenticationRepository } from '../repositories/authentication.repository';
import { RegistrationDto} from '../dto.models/registration.dto';
import { AuthenticationDto} from '../dto.models/authentication.dto';

export const TYPES = {
    Survey: Symbol.for('Survey'),
    RegistrationDto: Symbol.for('RegistrationDto'),
    AuthenticationDto: Symbol.for('AuthenticationDto')
};


export class RepositoryProvider {
    public static bindRepositories(container: Container) {
        container.bind<Repository<Survey>>(TYPES.Survey).to(SurveyRepository);
        container.bind<Repository<RegistrationDto>>(TYPES.RegistrationDto).to(RegistrationRepository);
        container.bind<Repository<AuthenticationDto>>(TYPES.AuthenticationDto).to(AuthenticationRepository);
    }
}
