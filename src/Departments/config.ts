import { TableHeaderLabel } from "@/_shared/components/types/TableTypes";
import { TableSettings } from "@/_shared/components/types/TableTypes";

export const TableConfiguration = () => {
  const tableHead: TableHeaderLabel[] = [
    {
      id: "deptdescription",
      header: "Department",
      size: 250,
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
