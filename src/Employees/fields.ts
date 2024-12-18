import { FormElement } from "@/_shared/components/types/FormElement";
import { getDepartmentsQuery } from "@/Departments/api";

export const getEmployeesFields = (
  isAddPageEnable: boolean,
  isEditPageEnable: boolean,
  isViewPageEnable: boolean,
  account: string
): FormElement[] => {
  const { data } = getDepartmentsQuery(account);
  const deptData = data?.data.payload;

  const department = deptData?.map((dept: any) => ({
    id: dept.deptcode,
    name: dept.deptdescription,
  }));

  return [
    {
      type: "text",
      name: "fullname",
      label: "Fullname",
      placeholder: "Fullname",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Fullname is required",
    },
    {
      type: "number",
      name: "age",
      label: "Age",
      placeholder: "Age",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Age is required",
    },
    {
      type: "number",
      name: "esttotalincome",
      label: "Salary",
      placeholder: "Salary",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Salary is required",
    },
    {
      type: "date",
      name: "hiredate",
      label: "Start Date",
      placeholder: "Start Date",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Start Date is required",
    },
    {
      type: "select",
      selectOpt: department,
      name: "deptcode",
      label: "Department",
      placeholder: "Department",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Department is required",
    },
    {
      type: "toggle",
      toggleStyle: "android",
      name: "is_lock",
      label: "Locked",
      placeholder: "Locked",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Locked is required",
    },
  ];
};

// const formElements = (): FormElement[] => {
//   const { deptData } = API_CON();
//   const data = deptData?.data.payload;

//   const department = data?.map((dept: any) => ({
//     id: dept.deptcode,
//     name: dept.deptdescription,
//   }));

//   return [
//     {
//       id: "is_lock",
//       label: "Locked",
//       name: "is_lock",
//       // type: "check",
//       type: "switch",
//       switchStyle: "IOS",
//     },
//   ];
// };
