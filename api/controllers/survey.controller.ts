import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { Controller} from '../core/interfaces/controller';
import { Repository } from '../core/interfaces/repository';
import { TYPES } from '../providers/repository.provider';
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
