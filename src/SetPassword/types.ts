export interface RequestResponse {
  code: number;
  status: string;
  payload: {
    msg: string
  };
}

export interface ChangePasswordField {
  usrcde: string;
  usrpwd: string;
  newpass: string;
  retypepass: string;
}
