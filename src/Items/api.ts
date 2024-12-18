import { ApiService } from "@/_shared/api";
import { useQuery } from "react-query";
import { RequestResponse } from "./types";

export const getItemsQuery = (account: string) => {
  const { data, refetch } = useQuery<any>(
    "items",
    async () =>
      await ApiService.get("/items", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, refetch };
};

export const addItemsQuery = async (
  account: string,
  data: any,
  isDocnumChecked: boolean
): Promise<RequestResponse> => {
  const docnum = isDocnumChecked ? "docnum" : "";
  const response = await ApiService.post(`/items/${docnum}`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: {
      msg: response.data.payload.msg,
    }
  };
};

export const editItemsQuery = async (
  account: string,
  docnum: string,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.put(`/items/${docnum}`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: {
      msg: response.data.payload.msg,
    }
  };
};

export const deleteItemsQuery = async (
  docnum: string,
  account: string
): Promise<RequestResponse> => {
  const response = await ApiService.delete(`/items/${docnum}`, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: {
      msg: response.data.payload.msg,
    }
  };
};
