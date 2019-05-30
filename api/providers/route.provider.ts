import { Route } from '../core/models/route';
import { SurveyController } from '../controllers/survey.controller';

export class RouteProvider {
    public static getRoutes(): Route[] {
        return [
            { path: '/survey', controller: SurveyController },
        ];
    }
}