import { IconifyIcon } from "@iconify/react";

export interface TableProps<T> {
  title?: string;
  placeholder?: string;
  tableHead?: TableHeaderLabel[];
  tableData?: T[];
  actionElement?: TableActionMenu[];
  tableSettings?: TableSettings[];
  actionDialog?: () => JSX.Element;
  refetch?: () => void;
  enableTitle?: boolean;
  enableCheckbox?: boolean;
  setItemToAdd?: (itemToAdd: any[]) => void;
  setSelectedCheckData?: (selectedData: any[]) => void;
}

export interface TableHeaderLabel {
  id: string;
  header: string;
  size: number;
  format?: string;
  align?: "left" | "center" | "right";
  currency?: string;
  decimalCnt?: number;
  type:
    | "text"
    | "date"
    | "monetary"
    | "number"
    | "email"
    | "password"
    | "check"
    | "cndn";
  cndntype?: number;
}

export interface TableActionMenu {
  label: string;
  icon: IconifyIcon;
  type: "Edit" | "View" | "Delete" | "Access";
  callback?: (type: "Edit" | "View" | "Delete" | "Access", row: any) => void;
}

export interface TableSettings {
  stripeRows?: boolean;
  stripeColumns?: boolean;
  stripeColor?: string;
  addButton?: boolean;
  sysParam?: boolean;
  printButton?: boolean;
  columnAction?: boolean;
  columnOrdering?: boolean;
  columnPinning?: boolean;
  actionsMenu?: boolean;
}
