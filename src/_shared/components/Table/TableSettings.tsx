import { TableProps } from "../types/TableTypes";

export const TableSettings = <T extends any[]>({
  tableSettings,
}: TableProps<T>) => {
  const stripeColor = tableSettings?.[0].stripeColor;
  const addButton = tableSettings?.[0].addButton;
  const sysParam = tableSettings?.[0].sysParam;
  const printButton = tableSettings?.[0].printButton;
  const columnAction = tableSettings?.[0].columnAction;
  const columnOrdering = tableSettings?.[0].columnOrdering;
  const columnPinning = tableSettings?.[0].columnPinning;
  const actionsMenu = tableSettings?.[0].actionsMenu;

  return {
    stripeColor,
    addButton,
    sysParam,
    printButton,
    columnAction,
    columnOrdering,
    columnPinning,
    actionsMenu,
  };
};
