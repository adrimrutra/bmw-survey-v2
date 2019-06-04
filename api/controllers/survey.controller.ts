import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { IController} from '../core/interfaces/i.controller';
import { IRepository } from '../core/interfaces/i.repository';
import { TYPES } from '../providers/repository.provider';
import { Survey } from '../models/survey';
import 'reflect-metadata';

import NotFoundException from '../exceptions/NotFoundException';
import BadRequestException from '../exceptions/BadRequestException';



@injectable()
 export class SurveyController implements IController {

    constructor(@inject(TYPES.Survey) private repository: IRepository<Survey>) {
    }

    async get(req: Request) {
        return await this.repository.Get();
    }
    async post(req: Request): Promise<any> {
        await this.repository.Add(req.body).then((res) => {
            return  res;
        }).catch((err) => {
            throw new BadRequestException();
        });
    }

    async put(id: any, req: Request) {
        if (!req.body.data || !req.body.data._id) {
            throw new NotFoundException();
        }

        const survey: Survey = req.body.data;
        return await this.repository.Update(req.body.data._id, survey);
    }
    async delete(id: any, req: Request): Promise<any> {
        throw new NotFoundException();
    }
}
