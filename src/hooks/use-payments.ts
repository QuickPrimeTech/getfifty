import { ApiResponse } from "@/types/api";
import { Profile } from "@/types/profile";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export function useCreateDeposit() {
  return useMutation<
    ApiResponse<Profile>,
    AxiosError<ApiResponse<null>>,
    Profile
  >({
    mutationFn: async (user) => {
      const res = await axios.post(
        "/api/payment/deposit",
        JSON.stringify(user),
      );
      console.log(res.data);
      return res.data;
    },
  });
}
