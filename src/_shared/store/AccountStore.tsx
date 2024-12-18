import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AccountState {
  account: any | null;
  setAccount: (account: any) => void;
}

export const useAccountStore = create<AccountState>()(
  persist<AccountState>(
    (set) => ({
      account: null,
      setAccount: (account) => set({ account }),
    }),
    {
      name: 'account',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
