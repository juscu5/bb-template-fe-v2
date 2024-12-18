import { create } from "zustand";
import { Logout } from "../types/GlobalFuncTypes";
import { useCreateLog } from "./ActivityLogsStore";

export const useLogout = create<Logout>((set) => ({
  logMeOut: () => {
    const module = "logout";
    const activity = "Logging Out";
    const remarks = "Logout Successful";

    localStorage.removeItem("account");
    useCreateLog.getState().createLogs(module, activity, remarks);
    window.location.reload();
  },
}));
