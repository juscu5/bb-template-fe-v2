export interface RequestResponse {
  code: number;
  status: string;
  payload: {
    msg: string;
  }
}

export interface MaxRecordField {
  userlogmaxrec: number;
}
