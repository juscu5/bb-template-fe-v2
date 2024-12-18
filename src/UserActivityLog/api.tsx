import { ApiService } from "@/_shared/api";
import { useQuery } from "react-query";
import { RequestResponse } from "./types";
import { useAccountStore } from "@/_shared/store/AccountStore";

export const getUserActivityLogQuery = (account: string) => {
  const { data, refetch } = useQuery<any>(
    "useractivitylog",
    async () =>
      await ApiService.get("/useractivitylog", {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, refetch };
};
