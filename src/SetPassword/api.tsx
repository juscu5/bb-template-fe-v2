import { ApiService } from "@/_shared/api";
import { RequestResponse } from "./types";

export const changePassQuery = async (
  account: string,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.post(`/users/changepass`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: {
      msg: response.data.payload.msg,
    },
  };
};
