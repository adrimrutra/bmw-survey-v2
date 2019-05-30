import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from './core/router';


class App {
    public app: express.Application;
    public router = new Router();


    constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
         this.app.use(bodyParser.json());
         this.app.use('/api', this.router.route());
    }

    public getServer() {
        return this.app;
      }


    public listen() {
        this.app.listen(5000, () => {
          console.log('App listening on the port 5000');
        });
    }
}

export default App;
