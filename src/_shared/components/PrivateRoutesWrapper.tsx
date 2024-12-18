import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "./Appbar/V2";
import Sidebar from "./Sidebar/V4";
import Loader from "./Loader";
import { isLoggedInApi } from "../api/UsersApi";
import { useAccountStore } from "../store/AccountStore";
import { useAuthStore } from "../store/AuthStore";
import { useMutation } from "react-query";
import { useMinimizeDrawer } from "@/_shared/store/SidebarStore";
import { RootStyle } from "./Style/RootStyle";

const PrivateRoutesWrapper: React.FC = () => {
  const { account } = useAccountStore();
  const { setUser } = useAuthStore();
  const { isMinimized } = useMinimizeDrawer();
  const navigate = useNavigate();

  const checkUserProfile = useMutation(isLoggedInApi, {
    onSuccess: (data: any) => {
      setUser(data.payload);
    },
  });

  useEffect(() => {
    checkUserProfile.mutate(account);
  }, []);

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
  }, [account]);

  return (
    <div style={{ width: "100%" }}>
      <AppBar />
      <Sidebar>
        <Suspense fallback={<Loader />}>
          <RootStyle isMinimized={isMinimized}>
            <Outlet />
          </RootStyle>
        </Suspense>
      </Sidebar>
    </div>
  );
};

export default PrivateRoutesWrapper;
