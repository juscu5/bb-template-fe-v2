import { FormElement } from "@/_shared/components/types/FormElement";
import { useCheckedSystemParameters } from "@/_shared/hooks/SystemParameters";

export const getFields = (
  isAddPageEnable: boolean,
  isEditPageEnable: boolean,
  isViewPageEnable: boolean
): FormElement[] => {
  const { isDocnumChecked } = useCheckedSystemParameters("chkitmclacde");

  return [
    {
      type: "text",
      name: "usrname",
      label: "Username",
      placeholder: "Username",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Username is required",
    },
    {
      type: "password",
      name: "usrpwd",
      label: "Password",
      placeholder: "Password",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Password is required",
    },
    {
      type: "select",
      name: "usrlvl",
      label: "User Level",
      placeholder: "User Level",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "User Level is required",
      selectOpt: [
        { id: "Supervisor", name: "Supervisor" },
        { id: "User", name: "User" },
      ],
    },
    {
      type: "text",
      name: "emailadd",
      label: "Email Address",
      placeholder: "Email Address",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Email address is required",
    },
    {
      type: "text",
      name: "fullname",
      label: "Employee Full Name",
      placeholder: "Employee Full Name",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Employee full name is required",
    },
  ];
};
