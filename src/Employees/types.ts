import { Dayjs } from "dayjs";

export interface RequestResponse {
  code: number;
  status?: string;
  payload?: any;
}

export interface EmployeesField {
  fullname: string;
  age: string;
  esttotalincome: string;
  hiredate: Dayjs;
  deptcode: string;
  is_lock: boolean | number;
}
