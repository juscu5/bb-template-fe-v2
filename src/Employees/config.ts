import { TableHeaderLabel } from "@/_shared/components/types/TableTypes";
import { TableSettings } from "@/_shared/components/types/TableTypes";

export const TableConfiguration = () => {
  const tableHead: TableHeaderLabel[] = [
    {
      id: "fullname",
      header: "Fullname",
      size: 180,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password   alignment
    },
    {
      id: "age",
      header: "Age",
      size: 100,
      align: "left", // left | center | right
      type: "number", // text | date | monetary | number | email | password
    },
    {
      id: "deptdescription",
      header: "Department",
      size: 250,
      align: "left", // left | center | right
      type: "text", // text | date | monetary | number | email | password   alignment
    },
    {
      id: "esttotalincome",
      header: "Salary",
      size: 200,
      align: "left", // left | center | right
      type: "monetary", // text | date | monetary | number | email | password
      decimalCnt: 2,
      currency: "PHP", // User define the currency symbol exmple $ or ₱
    },
    {
      id: "hiredate",
      header: "Hire Date",
      size: 200,
      format: "MMMM D, YYYY", // MM/DD/YYYY | MMMM D, YYYY | MMM D, YYYY
      align: "left", // left | center | right
      type: "date", // text | date | monetary | number | email | password
    },
    {
      id: "is_lock",
      header: "Is Lock",
      size: 100,
      align: "left", // left | center | right
      type: "cndn", // text | date | monetary | number | email | password | cndn
      cndntype: 2, // 1 | 2 | 3
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
