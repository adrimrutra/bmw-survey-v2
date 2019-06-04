import * as appRoot from 'app-root-path';
import * as winston from 'winston';


export default class WinstonLogger{
    public logger;


    // interface FileTransportOptions extends Transport.TransportStreamOptions {
     
    //   dirname?: string;
    //   options?: object;
    //   maxsize?: number;
    //   stream?: NodeJS.WritableStream;
    //   rotationFormat?: Function;
    //   zippedArchive?: boolean;
    //   maxFiles?: number;
    //   eol?: string;
    //   tailable?: boolean;
    // }

    // consoleWarnLevels?: string[],
    // stderrLevels?: string[];
    // debugStdout?: boolean;
    // eol?: string;

    private options = {
        file: {
          filename: `${appRoot}/logs/app.log`,
          maxsize: 5242880, // 5MB
          maxFiles: 5
        }
      };

      constructor(){
        this.logger = winston.createLogger({
          level: 'info',
          format: winston.format.json(),
          transports: [
            new winston.transports.File(this.options.file),
            new winston.transports.Console()
          ],
          exitOnError: false,
        });

        this.logger.stream = {
            write: function(message) {
              // use the 'info' log level so the output will be picked up by both transports (file and console)
              this.logger.info(message);
            },
          };
    }
}

