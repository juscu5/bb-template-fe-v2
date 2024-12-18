import { FormElement } from "@/_shared/components/types/FormElement";
import { useCheckedSystemParameters } from "@/_shared/hooks/SystemParameters";
import { getItemClassQuery } from "@/ItemClass/api";

export const getFields = (
  isAddPageEnable: boolean,
  isEditPageEnable: boolean,
  isViewPageEnable: boolean,
  account: string
): FormElement[] => {
  const { isDocnumChecked } = useCheckedSystemParameters("chkcusdocnum");
  const { data } = getItemClassQuery(account);
  const itemClassData = data?.data?.payload;

  const itemClassOption = itemClassData?.map((iClass: any) => ({
    id: iClass.itmclacde,
    name: iClass.itmcladsc,
  }));

  return [
    {
      type: "text",
      name: "itmcde",
      label: "Item Code",
      placeholder: "Item Code",
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
      errorRequiredText: "Item code is required",
    },
    {
      type: "text",
      name: "itmdsc",
      label: "Item Description",
      placeholder: "Item Description",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Item description is required",
    },
    {
      type: "select",
      name: "itmtyp",
      label: "Item Type",
      placeholder: "Item Type",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Item type is required",
      selectOpt: [
        {
          id: "INVENTORY",
          name: "INVENTORY",
        },
        {
          id: "CHARGES",
          name: "CHARGES",
        },
        {
          id: "SERVICES",
          name: "SERVICES",
        },
      ],
    },
    {
      type: "text",
      name: "barcde",
      label: "Barcode",
      placeholder: "Barcode",
      disabled: false,
      fullWidth: false,
      required: false,
      readOnly: isViewPageEnable,
      autoFocus: true,
    },
    {
      type: "select",
      name: "itmclacde",
      label: "Item Class",
      placeholder: "Item Class",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Item class is required",
      selectOpt: itemClassOption,
    },
    {
      type: "select",
      name: "brndsc",
      label: "Brand",
      placeholder: "Brand",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Brand is required",
      selectOpt: [
        {
          id: "COKE",
          name: "COKE",
        },
        {
          id: "REDBULL",
          name: "REDBULL",
        },
        {
          id: "GATORADE",
          name: "GATORADE",
        },
      ],
    },
    {
      type: "select",
      name: "wardsc",
      label: "Warehouse",
      placeholder: "Warehouse",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Warehouse is required",
      selectOpt: [
        {
          id: "ALL",
          name: "ALL",
        },
        {
          id: "WAREHOUSE 1",
          name: "WAREHOUSE 1",
        },
        {
          id: "WAREHOUSE 2",
          name: "WAREHOUSE 2",
        },
      ],
    },
    {
      type: "text",
      name: "remarks",
      label: "Remarks",
      placeholder: "Remarks",
      disabled: false,
      fullWidth: false,
      required: false,
      readOnly: isViewPageEnable,
      autoFocus: true,
      multiline: true,
    },
    {
      type: "toggle",
      toggleStyle: "checkbox",
      name: "remarks",
      label: "Multiple Unit of Measures",
      placeholder: "Multiple Unit of Measures",
      disabled: false,
      fullWidth: false,
      required: false,
      readOnly: isViewPageEnable,
      autoFocus: true,
    },
    {
      type: "text",
      name: "untmea",
      label: "Unit Of Measure",
      placeholder: "Unit Of Measure",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Unit of measure is required",
    },
    {
      type: "number",
      name: "untcst",
      label: "Unit Cost",
      placeholder: "Unit Cost",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Unit cost is required",
    },
    {
      type: "number",
      name: "untprc",
      label: "Selling Price",
      placeholder: "Selling Price",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Selling price is required",
    },
    {
      type: "toggle",
      toggleStyle: "switch",
      name: "inactive",
      label: "isInactive",
      placeholder: "Inactive",
      disabled: false,
      fullWidth: false,
      required: false,
      readOnly: isViewPageEnable,
      autoFocus: true,
      multiline: true,
    },
    {
      type: "select",
      name: "itmrem1",
      label: "Re-Order Level",
      placeholder: "Re-Order Level",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: isViewPageEnable,
      autoFocus: true,
      errorRequiredText: "Re-order level is required",
      selectOpt: [
        {
          id: "Trade",
          name: "Trade",
        },
        {
          id: "Non-Trade",
          name: "Non-Trade",
        },
      ],
    },
  ];
};
