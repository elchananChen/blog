import { api } from "@/api/api";
import { LogInReq, LogInRes, User } from "@/types/userTypes";

const getAuthTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("jwt"));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

const token = getAuthTokenFromCookie();
console.log(token);

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await api.get(`/user/${id}`);
  return data?.user;
};

export const logIn = async (inputsData: LogInReq): Promise<LogInRes> => {
  const { data } = await api.post("/user/signIn", inputsData);
  return data;
};
