export type MessageResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};
