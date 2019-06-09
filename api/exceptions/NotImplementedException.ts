import HttpException from './HttpException';

class NotImplementedException extends HttpException {
  constructor() {
    super(501, 'Not Implemented');
  }
}
export default NotImplementedException;
