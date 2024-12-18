import { create } from "zustand";

interface MinimizeDrawerProps {
  isMinimized: boolean;
  setMinimized: (isMinimized: boolean) => void;
}

export const useMinimizeDrawer = create<MinimizeDrawerProps>((set) => ({
  isMinimized: true,
  setMinimized: (isMinimized) => set({ isMinimized }),
}));
