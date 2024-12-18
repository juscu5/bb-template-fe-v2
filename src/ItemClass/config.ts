import { TableHeaderLabel } from "@/_shared/components/types/TableTypes";
import { TableSettings } from "@/_shared/components/types/TableTypes";
import { DocnumConfig, PageTitleConfig } from "./types";

export const SysParConfiguration = () => {
  const DocnumConfig: DocnumConfig[] = [
    {
      isNotDocnum: false, // false if using docnum, true if using other pk (leave the rest blank or ""),
      docnumCheck: "chkitmclacde",
      docnumCode: "itmclacde",
      tableDocnum: "itmclacde",
    },
  ];
  return {
    DocnumConfig,
  };
};

export const PageConfiguration = () => {
  const title: PageTitleConfig[] = [
    {
      mainPageHeaderTitle: "Item Classification",
      addPageHeaderTitle: "Add Item Class",
      viewPageHeaderTitle: "View Item Class#",
      editPageHeaderTitle: "Edit Item Class#",
    },
  ];
  return {
    title,
  };
};

export const TableConfiguration = () => {
  const tableHead: TableHeaderLabel[] = [
    {
      id: "itmcladsc",
      header: "Item Class Description",
      size: 150,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password   alignment
    },
  ];
  const tableSettings: TableSettings[] = [
    {
      stripeColor: "#f5f5f5",
      addButton: true,
      printButton: true,
      sysParam: false,
      columnPinning: true,
      actionsMenu: true, //make sure it is false when you don't have
    },
  ];

  return {
    tableHead,
    tableSettings,
  };
};
