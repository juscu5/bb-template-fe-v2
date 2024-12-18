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
      name: "itmclacde",
      label: "Item Class Code",
      placeholder: "Item Class Code",
      disabled: isAddPageEnable
        ? isDocnumChecked
        : isEditPageEnable
        ? true
        : false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Item class code is required",
    },
    {
      type: "text",
      name: "itmcladsc",
      label: "Item Class Description",
      placeholder: "Item Class Description",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Item class description is required",
    },
  ];
};
