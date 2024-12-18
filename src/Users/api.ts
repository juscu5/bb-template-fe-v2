import { ApiService } from "@/_shared/api";
import { useQuery } from "react-query";
import { RequestResponse } from "./types";

export const getUsersQuery = (account: string) => {
  const { data, refetch } = useQuery<any>(
    "users",
    async () =>
      await ApiService.get("/users", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, refetch };
};

export const addUserQuery = async (
  account: string,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.post(`/users`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};

export const editUserQuery = async (
  account: string,
  recid: string | number,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.put(`/users/${recid}`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};

export const deleteUserQuery = async (
  recid: string | number,
  account: string
): Promise<RequestResponse> => {
  const response = await ApiService.delete(`/users/${recid}`, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};
