import { Request, Response } from 'express';
import { Controller} from '../core/controller';
import { injectable, inject } from 'inversify';


import { Repository } from '../core/repository';
import { TYPES } from '../config/repositories';
import { Survey } from '../models/survey';


import 'reflect-metadata';



@injectable()
 export class SurveyController implements Controller {

    constructor(@inject(TYPES.Survey) private repository: Repository<Survey>) {
    }

    async get(req: Request) {
        return await this.repository.Get();
    }
    post(req: Request): Promise<any> {
        //throw new AppError(404, 'Not found.');
    }

    //@secure()
    async put(id: any, req: Request) {
        if (!req.body.data || !req.body.data._id) {
            //throw new AppError(400, 'Bad Request');
        }

        const survey: Survey = req.body.data;
        return await this.repository.Update(req.body.data._id, survey);
    }
    delete(id: any, req: Request): Promise<any> {
        //throw new AppError(404, 'Not found.');
    }
}
