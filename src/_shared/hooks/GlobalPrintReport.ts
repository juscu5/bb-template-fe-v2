import { Print } from "../components/Print";
import { TableHeaderLabel } from "../components/types/TableTypes";

export const usePrintPdf = (
  data: any,
  tableHead: TableHeaderLabel[],
  headerTitle: string,
  orientation: "portrait" | "landscape"
) => {
  const print = Print(data, tableHead, headerTitle, orientation);
  return print;
};
