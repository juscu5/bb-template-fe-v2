import { create } from "zustand";

interface SysparState {
  syspar: any[];
  setSyspar: (syspar: any[]) => void;
}

export const useSysparStore = create<SysparState>((set) => ({
  syspar: [],
  setSyspar: (syspar) => set({ syspar }),
}));
