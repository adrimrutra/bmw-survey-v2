import { Route } from './models/route';
import { Container, interfaces, injectable, inject } from 'inversify';
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
            this.container.bind<Controller>(element.controller).to(element.controller);
        });

        DbProvider.bindDataBase(this.container);

        this.db = this.container.resolve<DbConnection>(DbConnection);

        RepositoryProvider.bindRepositories(this.container);
    }

    public route(passport: any): any {
        const expressRouter = express.Router();
        this.container.bind<any>(TYPES.Passport).toConstantValue(passport);
        let RController = new RegistrationController(passport);

        (async () => {
            await  this.db.connect();

            this.routes.forEach(element => {

                const controller = this.container.resolve<Controller>(element.controller);
                this.controllers.push(controller);
                expressRouter.get(element.path, RController.get);
                expressRouter.get(element.path + '/:id', RController.getById);
                expressRouter.post(element.path, RController.post);
                expressRouter.put(element.path + '/:id', RController.put);
                expressRouter.delete(element.path + '/:id', RController.delete);
            });
        })();

        return expressRouter;
    }
}
