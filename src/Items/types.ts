export interface DocnumConfig {
  isNotDocnum: boolean;
  docnumCheck: string;
  docnumCode: string;
  tableDocnum: string;
}

export interface PageTitleConfig {
  mainPageHeaderTitle: string;
  addPageHeaderTitle: string;
  viewPageHeaderTitle: string;
  editPageHeaderTitle: string;
}

export interface RequestResponse {
  code: number;
  status: string;
  payload: {
    msg: string
  }
}

export interface CustomersField {
  itmcde: string;
  itmdsc: string;
  itmtyp: string;
  barcde: string;
  itmclacde: string;
  brndsc: string;
  wardsc: string;
  remarks: string;
  multium: boolean | number;
  untmea: string;
  untcst: number;
  untprc: number;
  inactive: boolean | number;
  itmrem1: string;
}
