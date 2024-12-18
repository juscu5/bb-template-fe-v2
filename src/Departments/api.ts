import { ApiService } from "@/_shared/api";
import { useQuery } from "react-query";
import { RequestResponse } from "./types";

export const getDepartmentsQuery = (account: string) => {
  const { data, refetch } = useQuery<any>(
    "departments",
    async () =>
      await ApiService.get("/department", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, refetch };
};

export const addDepartmentQuery = async (
  account: string,
  data: any,
  isDocnumChecked: boolean
): Promise<RequestResponse> => {
  const docnum = isDocnumChecked ? "docnum" : "";
  const response = await ApiService.post(`/department/${docnum}`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};

export const editDepartmentQuery = async (
  account: string,
  docnum: string,
  data: any
): Promise<RequestResponse> => {
  const response = await ApiService.put(`/department/${docnum}`, data, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};

export const deleteDepartmentQuery = async (
  deptcode: string,
  account: string
): Promise<RequestResponse> => {
  const response = await ApiService.delete(`/department/${deptcode}`, {
    headers: { Authorization: `Bearer ${account}` },
  });
  return {
    code: response.data.code,
    status: response.data.status,
    payload: response.data.payload,
  };
};
