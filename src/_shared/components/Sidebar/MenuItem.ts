import { useAccountStore } from "../../store/AccountStore";
import { useAuthStore } from "../../store/AuthStore";
import { useEffect, useState } from "react";
import { getKeyIcon } from "../../models/DynamicIcons";
import { getMenuItems, getMenuItemsWithUser } from "../../api/MenuApi";

// #region useFetchMenuItems
export const useFetchMenuItems = () => {
  const { data, isError, isFetched, isLoading, error } = getMenuItems();
  const { account } = useAccountStore();
  const { user } = useAuthStore();
  const [loadedData, setLoadedData] = useState<any>();

  useEffect(() => {
    const modifyData = () => {
      const modified = data.data.payload.map((menu: any) => {
        const children = menu.subMenus;

        if (children.length == 0) {
          return {
            label: menu.mencap,
            menprg: `${menu.menprg}`,
            icon: getKeyIcon(menu.menico),
            mengrp: menu.mengrp,
            mensub: menu.mensub,
            menidx: menu.menidx,
            modcde: menu.modcde,
            mennum: menu.mennum,
            menico: menu.menico,
          };
        }

        const mappedChildren = children.map((men: any) => {
          const children2 = men.superSubmenus;

          if (children2.length == 0) {
            return {
              label: men.mencap,
              menprg: `${men.menprg}`,
              icon: getKeyIcon(men.menico),
              mengrp: men.mengrp,
              mensub: men.mensub,
              menidx: men.menidx,
              modcde: men.modcde,
              mennum: men.mennum,
              menico: men.menico,
            };
          }
          const mappedChildren2 = children2.map((menchild: any) => {
            return {
              label: menchild.mencap,
              menprg: `${menchild.menprg}`,
              icon: getKeyIcon(menchild.menico),
              mengrp: menchild.mengrp,
              mensub: menchild.mensub,
              menidx: menchild.menidx,
              modcde: menchild.modcde,
              mennum: menchild.mennum,
              menico: menchild.menico,
              menheader: menchild.menheader,
              mencol: menchild.mencol,
              add:
                user?.usrlvl === "Supervisor"
                  ? menchild.allow_add
                  : menchild.has_add,
              edit:
                user?.usrlvl === "Supervisor"
                  ? menchild.allow_edit
                  : menchild.has_edit,
              delete:
                user?.usrlvl === "Supervisor"
                  ? menchild.allow_delete
                  : menchild.has_delete,
              view:
                user?.usrlvl === "Supervisor"
                  ? menchild.allow_view
                  : menchild.has_view,
              print:
                user?.usrlvl === "Supervisor"
                  ? menchild.allow_print
                  : menchild.has_print,
              lay:
                user?.usrlvl === "Supervisor"
                  ? menchild.allow_lay
                  : menchild.has_lay,
              export:
                user?.usrlvl === "Supervisor"
                  ? menchild.allow_export
                  : menchild.has_export,
              cancel:
                user?.usrlvl === "Supervisor"
                  ? menchild.allow_cancel
                  : menchild.has_cancel,
            };
          });
          return {
            label: men.mencap,
            menprg: `${men.menprg}`,
            icon: getKeyIcon(men.menico),
            mengrp: men.mengrp,
            mensub: men.mensub,
            menidx: men.menidx,
            modcde: men.modcde,
            mennum: men.mennum,
            menico: men.menico,
            items: mappedChildren2,
          };
        });

        return {
          label: menu.mencap,
          menprg: `${menu.menprg}`,
          icon: getKeyIcon(menu.menico),
          mengrp: menu.mengrp,
          mensub: menu.mensub,
          menidx: menu.menidx,
          modcde: menu.modcde,
          mennum: menu.mennum,
          menico: menu.menico,
          items: mappedChildren,
        };
      });

      setLoadedData(modified);
    };
    if (data) {
      modifyData();
    }
  }, [data, error]);

  return {
    isError,
    isFetched,
    isLoading,
    error: error as any,
    account,
    data: loadedData,
  };
};
// #endregion

// #region useFetchMenuItemsWithUser
export const useFetchMenuItemsWithUser = (usrcde: string, usrlvl: string) => {
  const { data, isError, isFetched, isLoading, error } = getMenuItemsWithUser(
    usrcde,
    usrlvl
  );
  const { account } = useAccountStore();

  const [loadedData, setLoadedData] = useState<any>();

  useEffect(() => {
    const modifyData = () => {
      const modified = data.data.payload.map((menu: any) => {
        const children = menu.subMenus;

        if (children.length == 0) {
          return {
            label: menu.mencap,
            menprg: `${menu.menprg}`,
            icon: getKeyIcon(menu.menico),
            mengrp: menu.mengrp,
            mensub: menu.mensub,
            menidx: menu.menidx,
            modcde: menu.modcde,
            mennum: menu.mennum,
            menico: menu.menico,
          };
        }

        const mappedChildren = children.map((men: any) => {
          const children2 = men.superSubmenus;

          if (children2.length == 0) {
            return {
              label: men.mencap,
              menprg: `${men.menprg}`,
              icon: getKeyIcon(men.menico),
              mengrp: men.mengrp,
              mensub: men.mensub,
              menidx: men.menidx,
              modcde: men.modcde,
              mennum: men.mennum,
              menico: men.menico,
            };
          }
          const mappedChildren2 = children2.map((menchild: any) => {
            return {
              label: menchild.mencap,
              menprg: `${menchild.menprg}`,
              icon: getKeyIcon(menchild.menico),
              mengrp: menchild.mengrp,
              mensub: menchild.mensub,
              menidx: menchild.menidx,
              modcde: menchild.modcde,
              mennum: menchild.mennum,
              menico: menchild.menico,
              add:
                usrlvl === "Supervisor" ? menchild.allow_add : menchild.has_add,
              edit:
                usrlvl === "Supervisor"
                  ? menchild.allow_edit
                  : menchild.has_edit,
              delete:
                usrlvl === "Supervisor"
                  ? menchild.allow_delete
                  : menchild.has_delete,
              view:
                usrlvl === "Supervisor"
                  ? menchild.allow_view
                  : menchild.has_view,
              print:
                usrlvl === "Supervisor"
                  ? menchild.allow_print
                  : menchild.has_print,
              lay:
                usrlvl === "Supervisor" ? menchild.allow_lay : menchild.has_lay,
              export:
                usrlvl === "Supervisor"
                  ? menchild.allow_export
                  : menchild.has_export,
              cancel:
                usrlvl === "Supervisor"
                  ? menchild.allow_cancel
                  : menchild.has_cancel,
            };
          });
          return {
            label: men.mencap,
            menprg: `${men.menprg}`,
            icon: getKeyIcon(men.menico),
            mengrp: men.mengrp,
            mensub: men.mensub,
            menidx: men.menidx,
            modcde: men.modcde,
            mennum: men.mennum,
            menico: men.menico,
            items: mappedChildren2,
          };
        });

        return {
          label: menu.mencap,
          menprg: `${menu.menprg}`,
          icon: getKeyIcon(menu.menico),
          mengrp: menu.mengrp,
          mensub: menu.mensub,
          menidx: menu.menidx,
          modcde: menu.modcde,
          mennum: menu.mennum,
          menico: menu.menico,
          items: mappedChildren,
        };
      });

      setLoadedData(modified);
    };
    if (data) {
      modifyData();
    }
  }, [data, error]);

  return {
    isError,
    isFetched,
    isLoading,
    error: error as any,
    account,
    data: loadedData,
  };
};

// #endregion
