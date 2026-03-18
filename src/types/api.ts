export type Params<T> = {
  params: Promise<T>;
};

export type ApiResponse<T = null> = {
  message: string;
  data: T;
  success: boolean;
};
