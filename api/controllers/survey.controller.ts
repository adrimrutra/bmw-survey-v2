import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { Controller } from '../core/interfaces/controller';
import { TYPES } from '../commons/typse';
import { SurveyModel } from '../models/survey';
import 'reflect-metadata';
import BadRequestException from '../exceptions/BadRequestException';
import NotImplementedException from '../exceptions/NotImplementedException';

@injectable()
 export class SurveyController implements Controller {
    constructor() {}

    get(req: Request, res: Response, next: NextFunction) {
        SurveyModel.find((err: any, surveys: any) => {
            if (err) {
                next(err);
            }
            res.json(surveys);
        });
    }

    post(req: Request, res: Response, next: NextFunction) {
        const survey = new SurveyModel(req.body);
        survey.save((err: any, data: any) => {
            if (err) {
                next(err);
            }
            res.status(200).json(data);
        });
    }
    getById(id: any, req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedException());
    }
    put(id: any, req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedException());
    }
    delete(id: any, req: Request, res: Response, next: NextFunction) {
        next(new NotImplementedException());
    }
}
