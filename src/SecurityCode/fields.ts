import { FormElement } from "@/_shared/components/types/FormElement";

export const getSecFields = (): FormElement[] => {
  return [
    {
      type: "text",
      name: "seccde",
      label: "Security Code",
      placeholder: "Security Code",
      disabled: false,
      fullWidth: false,
      required: true,
      readOnly: false,
      autoFocus: true,
      errorRequiredText: "Serial no. is required",
    },
  ];
};

export const getDetailsFields = (): FormElement[] => {
  return [
    {
      type: "text",
      name: "company_code",
      label: "Company Name",
      placeholder: "Company Name",
      disabled: false,
      fullWidth: true,
      required: false,
      readOnly: true,
      autoFocus: false,
    },
    {
      type: "text",
      name: "company_no",
      label: "Company Code",
      placeholder: "Company Code",
      disabled: false,
      fullWidth: true,
      required: false,
      readOnly: true,
      autoFocus: false,
    },
    {
      type: "text",
      name: "serialno",
      label: "Serial No",
      placeholder: "Serial No",
      disabled: false,
      fullWidth: true,
      required: false,
      readOnly: true,
      autoFocus: false,
    },
    {
      type: "text",
      name: "warningcode1",
      label: "Warning Code",
      placeholder: "Warning Code",
      disabled: false,
      fullWidth: true,
      required: false,
      readOnly: true,
      autoFocus: false,
    },
    {
      type: "text",
      name: "expringdate",
      label: "Expiring Date",
      placeholder: "Expiring Date",
      disabled: false,
      fullWidth: true,
      required: false,
      readOnly: true,
      autoFocus: false,
    },
  ];
};
