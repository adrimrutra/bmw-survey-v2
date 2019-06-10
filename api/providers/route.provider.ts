import { Route } from '../core/models/route';
import { SurveyController } from '../controllers/survey.controller';
import { RegistrationController } from '../controllers/registration.controller';

export class RouteProvider {
    public static getRoutes(): Route[] {
        return [
            { path: '/survey', controller: SurveyController },
            { path: '/registration', controller: RegistrationController }
        ];
    }
}