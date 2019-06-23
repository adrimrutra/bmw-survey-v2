import { Container } from 'inversify';
import { Repository } from '../core/interfaces/repository';
import { RegistrationRepository } from '../repositories/registration.repository';
import { Registration} from '../dto.models/registration';
import { TYPES } from '../commons/typse';

export class RepositoryProvider {
    public static bindRepositories(container: Container) {

    }
}
