import { api } from "@/api/api";
import { User } from "@/types/userTypes";

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await api.get(`user/${id}`);

  return data?.user;
};
