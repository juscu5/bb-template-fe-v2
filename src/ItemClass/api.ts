import { ApiService } from "@/_shared/api";
import { useQuery } from "react-query";
import { RequestResponse } from "./types";

export const getItemClassQuery = (account: string) => {
  const { data, refetch } = useQuery<any>(
    "itemclass",
    async () =>
      await ApiService.get("/itemclass", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, refetch };
};

export const addItemClassQuery = async (
  account: string,
  data: any,
  isDocnumChecked: boolean
): Promise<RequestResponse> => {
  const docnum = isDocnumChecked ? "docnum" : "";
  const response = await ApiService.post(`/itemclass/${docnum}`, data, {
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

export const editItemClassQuery = async (
  account: string,
  docnum: string | number,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.put(`/itemclass/${docnum}`, data, {
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

export const deleteItemClassQuery = async (
  docnum: string | number,
  account: string
): Promise<RequestResponse> => {
  const response = await ApiService.delete(`/itemclass/${docnum}`, {
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
