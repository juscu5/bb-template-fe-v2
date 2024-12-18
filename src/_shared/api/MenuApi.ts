import { useQuery } from "react-query";
import { useAccountStore } from "../store/AccountStore";
import { ApiService } from ".";
import { useAuthStore } from "../store/AuthStore";


export const getMenuItems = () => {
  const { account } = useAccountStore();
  const { user } = useAuthStore();

  const menus =
    user?.usrlvl === "Supervisor"
      ? "routes"
      : user?.usrlvl === "User"
      ? "usermenus"
      : "";

  const routes =
    user?.usrlvl === "Supervisor"
      ? `/menus/routes`
      : user?.usrlvl === "User"
      ? `/usermenus/${user.usrcde}`
      : "";

  const { isError, isFetched, data, isLoading, error } = useQuery<any>(
    menus,
    async () =>
      await ApiService.get(routes, {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, isError, isFetched, isLoading, error };
};

export const getMenuItemsWithUser = (usrcde?: string, usrlvl?: string) => {
  const { account } = useAccountStore();

  const menus =
    usrlvl === "Supervisor" ? "routes" : usrlvl === "User" ? "usermenus" : "";

  const routes =
    usrlvl === "Supervisor"
      ? `/menus/routes`
      : usrlvl === "User"
      ? `/usermenus/${usrcde}`
      : "";

  const { isError, isFetched, data, isLoading, error } = useQuery<any>(
    [menus, usrcde, usrlvl],
    async () =>
      await ApiService.get(routes, {
        headers: { Authorization: `Bearer ${account}` },
      })
  );
  return { data, isError, isFetched, isLoading, error };
};
