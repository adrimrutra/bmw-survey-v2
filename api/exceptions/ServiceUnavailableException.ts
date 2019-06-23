import HttpException from './HttpException';

class ServiceUnavailableException extends HttpException {
  constructor() {
    super(503, 'The server cannot handle the request (because it is overloaded or down for maintenance)');
  }
}
export default ServiceUnavailableException;
