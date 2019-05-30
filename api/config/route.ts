import { Route } from '../core/models/route';
import { SurveyController } from '../controllers/survey.controller';



export function getRoutes(): Route[] {
    return [
        {path: '/survey', controller: SurveyController},
    ];
}
