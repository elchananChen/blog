export type User = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  country: string;
  phone: string;
};

export type UserWithoutId = Omit<User, "id">;

export type LogInReq = {
  email?: string;
  phone?: string;
  password: string;
};

export type LogInRes = {
  isValid: boolean;
  message: string;
  id?: string;
};
