export interface ErrorResult {
  message: string;
}

export default interface ServiceResponse<T = any, Err = ErrorResult> {
  status: number;
  result: T | Err;
}
