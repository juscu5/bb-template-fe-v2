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

export interface UsersField {
  usrname: string;
  usrpwd: string;
  usrlvl: string;
  emailadd: string;
  fullname: string;
}
