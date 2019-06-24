import { Route } from './models/route';
import { inject, injectable, Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { RouteProvider } from '../providers/route.provider';
import { Controller } from './interfaces/controller';
import { TYPES } from '../commons/typse';
import * as express from 'express';
import { RepositoryProvider } from '../providers/repository.provider';
import { DbConnection } from './db.connection';
import HttpException from '../exceptions/HttpException';
import NotImplementedException from '../exceptions/NotImplementedException';
import { DbProvider } from '../providers/db.provider';
import { SurveyModel } from '../models/survey';

import {RegistrationController} from '../controllers/registration.controller';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@injectable()
export class Router {
    private routes: Route[];
    private container: Container;
    private controllers = new Array();
    private db: DbConnection;

    constructor() {
        this.routes = RouteProvider.getRoutes();
        this.container = new Container();
        this.binding();
    }

    public cleanup() {
        this.db.disconnect();
    }

    private binding() {

        this.routes.forEach(element => {
           // this.container.bind<Controller>(element.controller).to(element.controller);
        });

        DbProvider.bindDataBase(this.container);

        this.db = this.container.resolve<DbConnection>(DbConnection);

        this.container.bind<RegistrationController>(RegistrationController).to(RegistrationController);

        RepositoryProvider.bindRepositories(this.container);
    }

    public route(passport: any): any {
        const expressRouter = express.Router();
        let aaa: string;
        aaa = 'Hello';

       // this.container.bind<any>(TYPES.Passport).toConstantValue(passport);
        this.container.bind<string>('aaa').toConstantValue(aaa);

        (async () => {
            await  this.db.connect();
                const controller = this.container.resolve<RegistrationController>(RegistrationController);
                this.controllers.push(controller);
                expressRouter.get('/registration', controller.get);
                expressRouter.get('/registration' + '/:id', controller.getById);
                expressRouter.post('/registration', controller.post);
                expressRouter.put('/registration' + '/:id', controller.put);
                expressRouter.delete('/registration' + '/:id', controller.delete);

            // this.routes.forEach(element => {

            //     const controller = this.container.resolve<Controller>(element.controller);
            //     this.controllers.push(controller);
            //     expressRouter.get(element.path, controller.get);
            //     expressRouter.get(element.path + '/:id', controller.getById);
            //     expressRouter.post(element.path, controller.post);
            //     expressRouter.put(element.path + '/:id', controller.put);
            //     expressRouter.delete(element.path + '/:id', controller.delete);
            // });
        })();

        return expressRouter;
    }
}
