import { ApiService } from "@/_shared/api";
import { RequestResponse } from "./types";

export const addItemsQuery = async (
  account: string,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.post(`/seccode`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    status: response.request.status,
    statusText: response.request.statusText,
    payload: {
      data: response.data,
    },
  };
};
