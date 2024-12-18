import { ApiService } from "@/_shared/api";
import { useQuery } from "react-query";
import { RequestResponse } from "./types";

export const getEmployeesQuery = (account: string) => {
  const { data, refetch } = useQuery<any>(
    "employees",
    async () =>
      await ApiService.get("/employees", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, refetch };
};

export const addEmployeesQuery = async (
  account: string,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.post(`/employees/`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};

export const editEmployeesQuery = async (
  account: string,
  recid: string | number,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.put(`/employees/${recid}`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};

export const deleteEmployeesQuery = async (
  recid: string,
  account: string
): Promise<RequestResponse> => {
  const response = await ApiService.delete(`/employees/${recid}`, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};
