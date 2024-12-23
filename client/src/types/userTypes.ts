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
