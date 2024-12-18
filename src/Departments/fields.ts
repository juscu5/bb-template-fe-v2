import { FormElement } from "@/_shared/components/types/FormElement";
import { useCheckedSystemParameters } from "@/_shared/hooks/SystemParameters";

export const getDepartmentFields = (isAddPageEnable: boolean, isEditPageEnable: boolean, isViewPageEnable: boolean): FormElement[] => {
  const { isDocnumChecked } = useCheckedSystemParameters("chkdeptdocnum");
  return [
    {
      type: "text",
      name: "deptcode",
      label: "Department Code",
      placeholder: "Department Code",
      disabled: isAddPageEnable && isDocnumChecked ? true : isEditPageEnable ? true : false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Document no. is required",
    },
    {
      type: "text",
      name: "deptdescription",
      label: "Department Description",
      placeholder: "Department Description",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: false,
      errorRequiredText: "Department description is required.",
    },
  ];
};
