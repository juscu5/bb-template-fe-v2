import { TableHeaderLabel } from "@/_shared/components/types/TableTypes";
import { TableSettings } from "@/_shared/components/types/TableTypes";
import { DocnumConfig, PageTitleConfig } from "./types";

export const SysParConfiguration = () => {
  const DocnumConfig: DocnumConfig[] = [
    {
      isNotDocnum: true, // true if using docnum, false if using other pk (leave the rest blank or ""),
      docnumCheck: "",
      docnumCode: "",
      tableDocnum: "",
    },
  ];
  return {
    DocnumConfig,
  };
};

export const PageConfiguration = () => {
  const title: PageTitleConfig[] = [
    {
      mainPageHeaderTitle: "Users",
      addPageHeaderTitle: "Add User",
      viewPageHeaderTitle: "View User#",
      editPageHeaderTitle: "Edit User#",
    },
  ];
  return {
    title,
  };
};

export const TableConfiguration = () => {
  const tableHead: TableHeaderLabel[] = [
    {
      id: "usrname",
      header: "Username",
      size: 250,
      align: "left",
      type: "text",
    },
    {
      id: "usrlvl",
      header: "User Level",
      size: 250,
      align: "left",
      type: "text",
    },
    {
      id: "emailadd",
      header: "Email Address",
      size: 250,
      align: "left",
      type: "text",
    },
    {
      id: "fullname",
      header: "Employee Full Name",
      size: 250,
      format: " MMMM D, YYYY",
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
