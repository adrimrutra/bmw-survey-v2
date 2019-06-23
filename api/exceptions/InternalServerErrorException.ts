import HttpException from './HttpException';

class InternalServerErrorException extends HttpException {
  constructor(err: any) {
    super(500, err.message);
  }
}
export default InternalServerErrorException;
