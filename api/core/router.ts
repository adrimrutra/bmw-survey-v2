import { Route } from './models/route';
import { Container, interfaces } from 'inversify';
import { RouteProvider } from '../providers/route.provider';
import { Controller, Get, GetById, Post, Put, Delete} from './interfaces/controller';

import { Request, Response, NextFunction} from 'express';
import * as express from 'express';
import { RepositoryProvider } from '../providers/repository.provider';
import { DbConnection } from './db.connection';
import HttpException from '../exceptions/HttpException';
import NotImplementedException from '../exceptions/NotImplementedException';
import {AuthenticationController} from '../controllers/authentication.controller';



export class Router {
    private routes: Route[];
    private container: Container;
    private controllers = new Array();
    private db = new DbConnection();
    private passport: any;

    constructor(passport: any) {
        this.routes = RouteProvider.getRoutes();
        this.passport = passport;
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

        this.container.bind<Controller>(AuthenticationController).toConstructor<any>(this.passport);

        RepositoryProvider.bindRepositories(this.container);
    }

    public route(): any {
        const expressRouter = express.Router();
        (async () => {
            await  this.db.connect();

            this.routes.forEach(element => {

                const controller = this.container.resolve<Controller>(element.controller);
                this.controllers.push(controller);

                if (this.container.get(element.controller) as Get) {
                    expressRouter.get(element.path, this.requestHandle(
                        (c: Get, req: Request, next: NextFunction) =>
                            c.get(req, next), controller));
                } else {
                    throw new NotImplementedException();
                }

                if (this.container.get(element.controller) as GetById) {
                    expressRouter.get(element.path + '/:id', this.requestHandle(
                        (c: GetById, req: Request, id: number, next: NextFunction) =>
                            c.getById(id, req, next), controller));
                } else {
                    throw new NotImplementedException();
                }

                if (this.container.get(element.controller) as Post) {
                    expressRouter.post(element.path, this.requestHandle(
                        (c: Post, req: Request, next: NextFunction) =>
                            c.post(req, next), controller));
                } else {
                    throw new NotImplementedException();
                }

                if (this.container.get(element.controller) as Put) {
                    expressRouter.put(element.path + '/:id', this.requestHandle(
                        (c: Put, req: Request, id: number, next: NextFunction) =>
                            c.put(id, req, next), controller));
                } else {
                    throw new NotImplementedException();
                }

                if (this.container.get(element.controller) as Delete) {
                    expressRouter.delete(element.path + '/:id', this.requestHandle(
                        (c: Delete, req: Request, id: number, next: NextFunction) =>
                            c.delete(id, req, next), controller));
                } else {
                    throw new NotImplementedException();
                }
            });



            // expressRouter
            //         .get('*', this.requestHandle(
            //             (c: Get, req: Request, id: number, next: NextFunction) => {}, null))
            //         .get('*', this.requestHandle(
            //             (c: GetById, req: Request, id: number, next: NextFunction) => {}, null))
            //         .post('*', this.requestHandle(
            //             (c: Post, req: Request, id: number, next: NextFunction) => {}, null))
            //         .put('*', this.requestHandle(
            //             (c: Put, req: Request, id: number, next: NextFunction) => {}, null))
            //         .delete('*', this.requestHandle(
            //             (c: Delete, req: Request, id: number, next: NextFunction) => {}, null));
        })();

        return expressRouter;
    }

    private requestHandle(controllerHandler, controller: Controller) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let response: any;
                const id = req.params.id;

                if (id) {
                    response = await controllerHandler(controller, req, id, next);
                } else {
                    response = await controllerHandler(controller, req, next);
                }

                if (response) {
                    res.status(200).json(response);
                } else {
                   // res.sendStatus(204);
                }
            } catch (err) {
                console.log(err);
                if (err.status < 600) {
                    //res.status(err.status).json({message: err.message});
                } else {
                   // res.status(500).json({message: err.message, stack: err.stack});
                  // next();
                }
            }

        };
    }
}
