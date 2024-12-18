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
    msg: string;
  };
}

export interface SalesFormElement {
  name: string;
  label: string;
  placeholder: string;
  fullWidth: boolean;
  required: boolean;
  disabled: boolean;
  readOnly: boolean;
  autoFocus: boolean;
  errorRequiredText?: string;
  multiline?: boolean;
  selectOpt?: any[];
}

export interface SalesField {
  salesDetails: {
    docnum: string;
    cuscde: string;
    cusdsc: string;
    shipto: string;
    preby: string;
    trndte: string;
    refnum: string;
    ewtcde: string;
    evatcde: string;
    usrcde: string;
    smncde: string;
    trmcde: string;
    advdoc: string;
    remarks: string;
    chkby: string;
    apvby: string;
    totamtdisfor: number;
  };
  salesItem: {
    dettype: string;
    itmcde: string;
    itmdsc: string;
    taxcde: string;
    itmqty: number;
    untmea: string;
    groprc: number;
    discountCode: string;
    discper: number;
    discamt: number;
    untprc: number;
    extprc: number;
    sonum: string;
    drnum: string;
    barcde: string;
  }[];
}

export interface SalesFormProps {
  isDocnumChecked: boolean;
  docNum: string;
  customer: any;
  user: string;
  primaryId: string | number;
  isAddPageEnable: boolean;
  isEditPageEnable: boolean;
  isViewPageEnable: boolean;
  salesItemData: any;
  isSuccess: boolean;
}

export interface ItemDetailsProps {
  primaryId: string | number;
  isAddPageEnable: boolean;
  isEditPageEnable: boolean;
  isViewPageEnable: boolean;
  salesItemData: any;
  isSuccess: boolean;
}

export interface SalesDetailsProps {
  isDocnumChecked: boolean;
  customer: any;
  isViewPageEnable: boolean;
}
