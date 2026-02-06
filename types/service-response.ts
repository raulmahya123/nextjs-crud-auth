export interface ServiceResponse<T> {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
}
