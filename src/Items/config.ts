import { TableHeaderLabel } from "@/_shared/components/types/TableTypes";
import { TableSettings } from "@/_shared/components/types/TableTypes";
import { DocnumConfig, PageTitleConfig } from "./types";

export const SysParConfiguration = () => {
  const DocnumConfig: DocnumConfig[] = [
    {
      isNotDocnum: false, // true if using docnum, false if using other pk (leave the rest blank or ""),
      docnumCheck: "chkitmcde",
      docnumCode: "itmcde",
      tableDocnum: "itmcde",
    },
  ];
  return {
    DocnumConfig,
  };
};

export const PageConfiguration = () => {
  const title: PageTitleConfig[] = [
    {
      mainPageHeaderTitle: "Items",
      addPageHeaderTitle: "Add Item",
      viewPageHeaderTitle: "View Item#",
      editPageHeaderTitle: "Edit Item#",
    },
  ];
  return {
    title,
  };
};

export const TableConfiguration = () => {
  const tableHead: TableHeaderLabel[] = [
    {
      id: "itmdsc",
      header: "Item Description",
      size: 150,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password   alignment
    },
    {
      id: "itmtyp",
      header: "Item Type",
      size: 150,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password   alignment
    },
    {
      id: "itmcladsc",
      header: "Item Class",
      size: 150,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password   alignment
    },
    {
      id: "brndsc",
      header: "Brand",
      size: 150,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password   alignment
    },
    {
      id: "inactive",
      header: "isInactive",
      size: 150,
      align: "left", // left | center | right
      type: "cndn", // text | date | monetary | number | email | password | cndn
      cndntype: 2,
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
