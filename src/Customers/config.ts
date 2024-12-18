import { TableHeaderLabel } from "@/_shared/components/types/TableTypes";
import { TableSettings } from "@/_shared/components/types/TableTypes";
import { DocnumConfig, PageTitleConfig } from "./types";

export const SysParConfiguration = () => {
  const DocnumConfig: DocnumConfig[] = [
    {
      isNotDocnum: false, // false if using docnum, true if using other pk (leave the rest blank or ""),
      docnumCheck: "chkdeptdocnum",
      docnumCode: "cusdocnum",
      tableDocnum: "cuscde",
    },
  ];
  return {
    DocnumConfig,
  };
};

export const PageConfiguration = () => {
  const title: PageTitleConfig[] = [
    {
      mainPageHeaderTitle: "Customers",
      addPageHeaderTitle: "Add Customer",
      viewPageHeaderTitle: "View Customer#",
      editPageHeaderTitle: "Edit Customer#",
    },
  ];
  return {
    title,
  };
};

export const TableConfiguration = () => {
  const tableHead: TableHeaderLabel[] = [
    {
      id: "cusdsc",
      header: "Customer Description",
      size: 150,
      align: "left", 
      type: "text", 
    },
    {
      id: "cusadd1",
      header: "Address 1",
      size: 200,
      align: "left", 
      type: "text", 
    },
    {
      id: "cusadd2",
      header: "Address 2",
      size: 200,
      align: "left",
      type: "text", 
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
