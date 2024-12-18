import { ApiService } from "@/_shared/api";
import { useQuery } from "react-query";
import { RequestResponse } from "./types";

export const getSalesQuery = (account: string) => {
  const { data, refetch } = useQuery<any>(
    "sales",
    async () =>
      await ApiService.get("/sales", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, refetch };
};

export const getSalesItemsQuery = (
  account: string,
  docnum: string | number
) => {
  const { data, refetch, isSuccess } = useQuery<any>(
    ["salesitem", docnum],
    async () =>
      await ApiService.get(`/sales/salesitem/${docnum}`, {
        headers: { Authorization: `Bearer ${account}` },
      }),
    {
      enabled: docnum !== 0,
    }
  );
  return { data, refetch, isSuccess };
};

export const addSaleTransaction = async (
  account: string,
  data: any,
  isDocnumChecked: boolean
): Promise<RequestResponse> => {
  const docnum = isDocnumChecked ? "docnum" : "";
  const response = await ApiService.post(`/sales/${docnum}`, data, {
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

export const editSaleTransaction = async (
  account: string,
  docnum: string | number,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.put(`/sales/${docnum}`, data, {
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

export const deleteSaleTransaction = async (
  docnum: string | number,
  account: string
): Promise<RequestResponse> => {
  const response = await ApiService.delete(`/sales/${docnum}`, {
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
