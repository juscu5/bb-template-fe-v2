import { ApiService } from "@/_shared/api";
import { useQuery } from "react-query";
import { RequestResponse } from "./types";

export const getCustomersQuery = (account: string) => {
  const { data, refetch } = useQuery<any>(
    "customers",
    async () =>
      await ApiService.get("/customers", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, refetch };
};

export const addCustomersQuery = async (
  account: string,
  data: any,
  isDocnumChecked: boolean
): Promise<RequestResponse> => {
  const docnum = isDocnumChecked ? "docnum" : "";
  const response = await ApiService.post(`/customers/${docnum}`, data, {
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

export const editCustomersQuery = async (
  account: string,
  docnum: string,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.put(`/customers/${docnum}`, data, {
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

export const deleteCustomersQuery = async (
  docnum: string,
  account: string
): Promise<RequestResponse> => {
  const response = await ApiService.delete(`/customers/${docnum}`, {
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
