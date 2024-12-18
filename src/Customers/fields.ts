import { FormElement } from "@/_shared/components/types/FormElement";
import { useCheckedSystemParameters } from "@/_shared/hooks/SystemParameters";

export const getFields = (
  isAddPageEnable: boolean,
  isEditPageEnable: boolean,
  isViewPageEnable: boolean
): FormElement[] => {
  const { isDocnumChecked } = useCheckedSystemParameters("chkcusdocnum");

  return [
    {
      type: "text",
      name: "cuscde",
      label: "Customer Code",
      placeholder: "Customer Code",
      disabled:
        isAddPageEnable && isDocnumChecked
          ? true
          : isEditPageEnable
          ? true
          : false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Customer code is required",
    },
    {
      type: "text",
      name: "cusdsc",
      label: "Customer Description",
      placeholder: "Customer Description",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Customer description is required",
    },
    {
      type: "text",
      name: "cusadd1",
      label: "Primary Address",
      placeholder: "Address 1",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Primary address is required",
      multiline: true,
    },
    {
      type: "text",
      name: "cusadd2",
      label: "Secondary Address",
      placeholder: "Address 2",
      disabled: false,
      fullWidth: false,
      required: false,
      readOnly: isViewPageEnable,
      autoFocus: true,
      multiline: true,
    },
  ];
};
