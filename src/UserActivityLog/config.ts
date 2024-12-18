import { TableHeaderLabel } from "@/_shared/components/types/TableTypes";
import { TableSettings } from "@/_shared/components/types/TableTypes";

export const TableConfiguration = () => {
  const tableHead: TableHeaderLabel[] = [
    {
      id: "usrdte",
      header: "User Date",
      size: 150,
      format: "MMMM D, YYYY",
      align: "left", // left | center | right
      type: "date", // text | date | monetary | number | email | password   alignment
    },
    {
      id: "usrtim",
      header: "User Time",
      size: 150,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password
    },
    {
      id: "usrcde",
      header: "User",
      size: 150,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password
      // decimalCnt: 2,
      // currency: "PHP", // User define the currency symbol exmple $ or ₱
    },
    {
      id: "modcde",
      header: "Module",
      size: 150,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password
    },
    {
      id: "activity",
      header: "Activity",
      size: 250,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password
    },
    {
      id: "remarks",
      header: "Remarks",
      size: 350,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password
    },
  ];
  const tableSettings: TableSettings[] = [
    {
      stripeColor: "#f5f5f5",
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
  };
};
