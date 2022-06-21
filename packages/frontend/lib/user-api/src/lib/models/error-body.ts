/* tslint:disable */
/* eslint-disable */
export interface ErrorBody {

  /**
   * The optional error code
   */
  code?: string;

  /**
   * A description of the error message
   */
  message: string;

  /**
   * The http method e.g GET, POST, PUT etc
   */
  method: string;

  /**
   * the url path
   */
  path: string;

  /**
   * The http status code
   */
  status: number;

  /**
   * The current timestamp
   */
  timestamp: string;
}
