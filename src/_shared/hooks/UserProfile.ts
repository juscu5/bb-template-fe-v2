import { isLoggedInApi } from "../api/UsersApi";
import { useAuthStore } from "../store/AuthStore";
import { useMutation } from "react-query";

export const useUserProfile = () => {
  const { setUser } = useAuthStore();
  const checkUserProfile = useMutation(isLoggedInApi, {
    onSuccess: (data: any) => {
      setUser(data.payload);
    },
  });
  return { checkUserProfile };
};
