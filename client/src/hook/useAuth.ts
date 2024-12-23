import { logIn } from "@/services/userService";
import { LogInReq } from "@/types/userTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inputsData: LogInReq) => logIn(inputsData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      return error;
    },
  });
}
