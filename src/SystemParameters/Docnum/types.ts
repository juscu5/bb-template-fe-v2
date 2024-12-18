export interface FormElementDocnum {
  checkFieldName: string;
  textFieldName: string;
  label: string;
  placeholder: string;
  fullWidth: boolean;
  required: boolean;
  disabled: boolean;
  readOnly: boolean;
  autoFocus: boolean;
}

export interface DocnumFields {
  saldocnum: string;
  chksaldocnum: boolean | number;
  sodocnum: string;
  chksodocnum: boolean | number;
  srtdocnum: string;
  chksrtdocnum: boolean | number;
  otdocnum: string;
  chkotdocnum: boolean | number;
  podocnum: string;
  chkpodocnum: boolean | number;
  aprdocnum: string;
  chkaprdocnumfor: boolean | number;
  arcdocnum: string;
  chkarcdocnum: boolean | number;
  cashdocnum: string;
  chkcashdocnum: boolean | number;
  cusdocnum: string;
  chkcusdocnum: boolean | number;
  invdocnum: string;
  chkinvdocnum: boolean | number;
  gldocnum: string;
  chkgldocnum: boolean | number;
  liqdocnum: string;
  chkliqdocnum: boolean | number;
  deptdocnum: string;
  chkdeptdocnum: boolean | number;
  itmcde: string;
  chkitmcde: boolean | number;
  itmclacde: string;
  chkitmclacde: boolean | number;
}

export interface DocnumFormProps {
  onSubmit: (data: DocnumFields) => void;
  formElement: FormElementDocnum[];
  sysParData: DocnumFields;
}
