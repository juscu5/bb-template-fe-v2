import { create } from "zustand";
import { useAuthStore } from "./AuthStore";
import { useAccountStore } from "./AccountStore";
import { CreateLog } from "../types/GlobalFuncTypes";
import { getCurrentTimeString } from "../utils/TimeString";
import { postActivityLog } from "../api/ActLogApi";

export const useCreateLog = create<CreateLog>((set) => ({
  createLogs: (module, activity, remarks) => {
    const user = useAuthStore.getState().user;
    const account = useAccountStore.getState().account;
    const payload = {
      modcde: module,
      usrcde: user?.usrcde,
      usrname: user?.usrcde,
      usrdte: new Date(),
      usrtim: getCurrentTimeString(),
      trndte: new Date(),
      module: module,
      activity: activity,
      remarks: remarks,
    };
    postActivityLog({ account, payload });
  },
}));
