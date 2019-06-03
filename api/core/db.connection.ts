import * as mongoose from 'mongoose';


export class DbConnection {
    private db_url = 'mongodb://localhost:27017/bmwsurvey';
    instance: typeof mongoose;
    isConnected = false;
    mongoose = require('mongoose');

    private readonly ReconnectTimeout = 20000;

    constructor() {
        if (process.env.MONGODB_URI) {
            console.log(process.env.MONGODB_URI);
            this.db_url = process.env.MONGODB_URI;
        }
    }

    private timeoutInstance = null;


    // async
    async connect() {
        try {


            // this.mongoose.Promise = global.Promise;
            // this.mongoose.connect(this.db_url, { useNewUrlParser: true }).then(
            //   () => {console.log('Database is connected'); },
            //   (err) => { console.log('Can not connect to the database' + err); }
            // );

           this.instance = await mongoose.connect(this.db_url, { useNewUrlParser: true });
           this.isConnected = true;


            if (this.timeoutInstance != null) {
                clearTimeout(this.timeoutInstance);
            }
        } catch (err) {
            console.log('Can not connect to the database' + err);
            this.timeoutInstance = setTimeout(() => {
                this.connect();
            }, this.ReconnectTimeout);
        }
    }

    async disconnect() {
        if (this.instance) {
            this.instance.disconnect();
        }
    }
}




