import { ApiService } from "../api";
import { useAccountStore } from "../store/AccountStore";
import { useQuery } from "react-query";
import { RequestResponse } from "../types/SystemParameters";

export const getSystemParameters = () => {
  const { account } = useAccountStore();

  const { data, refetch } = useQuery<any>(
    "syspar",
    async () =>
      await ApiService.get("/syspar", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );

  return {
    data,
    refetch,
  };
};

export const putSysParameters = async (
  data: any,
  account: string
): Promise<RequestResponse> => {
  const response = await ApiService.put(`/syspar`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: {
      msg: response.data.payload.msg
    },
  };
};
