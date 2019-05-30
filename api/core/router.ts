import { Route } from './models/route';
import { Container, interfaces } from 'inversify';
import { getRoutes } from '../config/route';
import { Controller} from './controller';
import { Request, Response } from 'express';
import * as express from 'express';
import { bindRepositories } from '../config/repositories';


export class Router {
    private routes: Route[];
    private container: Container;
    private controllers = new Array();


    constructor() {
        this.routes = getRoutes();

        this.container = new Container();
        this.binding();
    }

    private binding() {

        this.routes.forEach(element => {

            this.container.bind<Controller>(element.controller).to(element.controller);
        });

        bindRepositories(this.container);
    }

    public route(): any {
        const expressRouter = express.Router();
        (async () => {


            this.routes.forEach(element => {

                const controller = this.container.resolve<Controller>(element.controller);
                this.controllers.push(controller);

                expressRouter.get(element.path, this.handleRequest(
                    (c: Controller, req: Request) => c.get(req), controller, controller.get));
                expressRouter.post(element.path, this.handleRequest(
                    (c: Controller, req: Request) => c.post(req), controller, controller.post));

                expressRouter.put(element.path + '/:id', this.handleRequest(
                    (c: Controller, req: Request, id) => c.put(id, req), controller, controller.put));
                expressRouter.delete(element.path + '/:id', this.handleRequest(
                    (c: Controller, req: Request, id) => c.delete(id, req), controller, controller.delete));
            });

            expressRouter
                    .get('*', this.handleRequest((controller: Controller, req: Request, id) => {}, null, null))
                    .post('*', this.handleRequest((controller: Controller, req: Request, id) => {}, null, null))
                    .put('*', this.handleRequest((ccontroller: Controller, req: Request, id) => {}, null, null))
                    .delete('*', this.handleRequest((controller: Controller, req: Request, id) => {}, null, null));
        })();

        return expressRouter;
    }

    private handleRequest(controllerHandler, controller: Controller, methodHandler) {
        return async (req: Request, res: Response) => {
            try {
                let response: any;
                const id = req.params.id;

                if (id) {
                    response = await controllerHandler(controller, req, id);
                } else {
                    response = await controllerHandler(controller, req);
                }

                if (response) {
                    res.status(200).json(response);
                } else {
                    res.sendStatus(204);
                }

            } catch (err) {
                if (err.responsecode && err.responsecode < 600) {
                    res.status(err.responsecode).json({message: err.message});
                } else {
                    res.status(500).json({message: err.message, stack: err.stack });
                }
            }

        };
    }
}
