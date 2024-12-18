export interface RequestResponse {
  status: number;
  statusText: string;
  payload: {
    data: {
      encrypted: string;
      expired: boolean;
      expiring: false;
      expiringDays: number;
      expringdate: string;
      incorrect: boolean;
      invalidcode: boolean;
      lstcom: {
        company_no: string;
        company_code: string;
      };
      lstpos: {
        serialno: string;
      };
      message: string;
      missing: boolean;
      override: boolean;
      passed: boolean;
      register: true;
      serial: boolean;
      warningcode1: string;
    };
  };
}

export interface SecurityCodesFields {
  company_code: string;
  company_no: string;
  serialno: string;
  warningcode1: string;
  expringdate: string;
  seccde: string;
}
