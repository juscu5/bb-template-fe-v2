import { TableHeaderLabel } from "@/_shared/components/types/TableTypes";
import { TableSettings } from "@/_shared/components/types/TableTypes";
import { DocnumConfig, PageTitleConfig } from "./types";

export const SysParConfiguration = () => {
  const DocnumConfig: DocnumConfig[] = [
    {
      isNotDocnum: false, // true if not using docnum, false if using other pk (leave the rest blank or ""),
      docnumCheck: "chksaldocnum",
      docnumCode: "saldocnum",
      tableDocnum: "docnum",
    },
  ];
  return {
    DocnumConfig,
  };
};

export const PageConfiguration = () => {
  const title: PageTitleConfig[] = [
    {
      mainPageHeaderTitle: "Sales",
      addPageHeaderTitle: "Add Sale Transaction",
      viewPageHeaderTitle: "View Sale Transaction:",
      editPageHeaderTitle: "Edit Sale Transaction:",
    },
  ];
  return {
    title,
  };
};

export const TableConfiguration = () => {
  const tableHead: TableHeaderLabel[] = [
    {
      id: "docnum",
      header: "Doc No.",
      size: 100,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password
    },
    {
      id: "trndte",
      header: "Trans Date",
      size: 100,
      format: " MMMM D, YYYY",
      align: "left", // left | center | right
      type: "date", // text | date | monetary | number | email | password
    },
    {
      id: "cusdsc",
      header: "Customer Description",
      size: 200,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password
    },
    {
      id: "totamtdisfor",
      header: "Amount",
      size: 100,
      align: "left", // left | center | right
      type: "monetary", // text | date | monetary | number | email | password
      currency: "PHP",
      decimalCnt: 2,
    },
    // {
    //   id: "recdocnum",
    //   header: "OR No.",
    //   size: 100,
    //   align: "left", // left | center | right
    //   type: "text", // text | date | monetary | number | email | password
    // },
    {
      id: "refnum",
      header: "REF No.",
      size: 100,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password
    },
    // {
    //   id: "docbalfor",
    //   header: "Balance",
    //   size: 100,
    //   align: "left", // left | center | right
    //   type: "monetary", // text | date | monetary | number | email | password
    //   currency: "PHP",
    //   decimalCnt: 2,
    // },
    // {
    //   id: "canceldoc",
    //   header: "Cancelled",
    //   size: 100,
    //   align: "left", // left | center | right
    //   type: "text", // text | date | monetary | number | email | password
    // },
    {
      id: "advdoc",
      header: "Advances",
      size: 100,
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
  const itemSearchTableSettings: TableSettings[] = [
    {
      addButton: true,
      printButton: true,
      sysParam: false,
      columnPinning: true,
      actionsMenu: false, //make sure it is false when you don't have
    },
  ];
  return {
    tableHead,
    tableSettings,
    itemSearchTableSettings,
  };
};
