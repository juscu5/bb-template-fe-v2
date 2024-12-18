import { Dayjs } from "dayjs";

export interface DatelockFields {
  gldatelock1: Dayjs;
  gldatelock2: Dayjs;
}

export interface DatelockFormProps {
  onSubmit: (data: DatelockFields) => void;
  sysParData: DatelockFields;
}
