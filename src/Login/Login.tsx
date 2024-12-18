import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";

import { useAccountStore } from "@/_shared/store/AccountStore";
import Form from "@/_shared/components/Form";
import { GlobalContext } from "@/_shared/context/GlobalContext";
import { loginUserApi } from "./api";
import { LoginCreds } from "./types";
import { getLoginFields } from "./fields";

export default function Login() {
  const { useSnackBar } = useContext(GlobalContext);

  const { setAccount } = useAccountStore();

  const navigate = useNavigate();

  const form = useForm<LoginCreds>({
    defaultValues: { usrcde: "", usrpwd: "" },
  });
  const { reset } = form;

  const { mutateAsync: loginMutation, isLoading } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      useSnackBar("Welcome!", { variant: "success" });
      setAccount(data?.payload?.BearerToken);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      useSnackBar(error?.response?.data?.status, { variant: "error" });
      reset();
    },
  });

  const onSubmit = async (data: LoginCreds) => {
    await loginMutation({ usrcde: data.usrcde, usrpwd: data.usrpwd });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            LSTV Building Blocks
          </Typography>
          <Toolbar
            sx={{
              mt: 6,
            }}
          />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Grid container justifyContent="center" m={3}>
            <Grid item xs={12} sm={8} md={6} justifySelf={"center"}>
              <Form
                form={form}
                onSubmit={onSubmit}
                isLoading={isLoading}
                formElements={getLoginFields(isLoading)}
                submitButtonText={isLoading ? "Signing in..." : "Sign In"}
              />
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 5 }}
          >
            {"Copyright © "}
            <Link color="inherit" to={"/"}>
              LSTV Building Blocks
            </Link>{" "}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
