import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { Router } from './core/router';
import errorMiddleware from './middleware/error.middleware';
import loggerMiddleware from './providers/logger.provider';

const port = process.env.PORT || '4000';

class App {
    public app: express.Application;
    public router = new Router();


    constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
         this.app.use(bodyParser.json());

         this.app.use(function(req, res, next) {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, x-access-token, Content-Type, Accept');
          next();
         });
         this.app.use('/api', this.router.route());
         this.app.use((request, response, next) => {
          console.log(`${request.method} ${request.path}`);
          console.log(`${response}`);
          next();
        });
    }

    private initializeErrorHandling() {
      this.app.use(errorMiddleware);
    }

    public getServer() {
        return this.app;
      }


    public listen() {
        this.app.listen(port, () => {
          console.log('App listening on the port ' + port);
        });
    }
}

export default App;
