import PageHeader from "@/_shared/components/PageHeader";
import { useAuthStore } from "@/_shared/store/AuthStore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { PassEncrypt } from "./utils";
import { ChangePasswordField } from "./types";
import { changePassQuery } from "./api";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { GlobalContext } from "@/_shared/context/GlobalContext";
import { useShowPasswordCtrl } from "./hooks";

const SetPassword = () => {
  const { account } = useAccountStore();
  const { user } = useAuthStore();
  const { useSnackBar } = useContext(GlobalContext);

  // Show Password State
  const {
    isVisibleOldPass,
    setVisibleOldPass,
    isVisibleNewPass,
    setVisibleNewPass,
    isVisibleRetypePass,
    setVisibleRetypePass,
  } = useShowPasswordCtrl();

  // Form State (react-hook-form)
  const { control, handleSubmit, watch } = useForm<ChangePasswordField>({
    defaultValues: {
      usrcde: user?.usrcde || "",
      usrpwd: "",
      newpass: "",
      retypepass: "",
    },
  });
  const newPass = watch("newpass");
  const reNewPass = watch("retypepass");

  // onSubmit
  const onSubmit = async (data: any) => {
    try {
      const res = await changePassQuery(account, data);
      console.log(res);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        control._reset({
          usrpwd: "",
          newpass: "",
          retypepass: "",
        });
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Info: ${error}`, { variant: "error" });
    }
  };

  return (
    <Box>
      <Grid container columns={6} flexDirection="inherit">
        <Grid item md={6} ml={2} mr={2}>
          <PageHeader title="Set Password" />
          <Divider sx={{ mr: 3, ml: 3 }} />
        </Grid>
        <Grid item md={3} m={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} width="100%">
              <Controller
                name="usrpwd"
                control={control}
                rules={{
                  required: "Old Password is required",
                  validate: (value: string) => {
                    const oldPassEncrypt = PassEncrypt(value);
                    if (oldPassEncrypt !== user?.usrpwd) {
                      return "Incorrect Password";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type={isVisibleOldPass ? "text" : "password"}
                    size="small"
                    label="Type Old Password"
                    placeholder="Type Old Password"
                    fullWidth
                    autoFocus
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    autoComplete="usrpwd"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setVisibleOldPass(false)}
                            onMouseDown={() => setVisibleOldPass(true)}
                          >
                            {isVisibleOldPass ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="newpass"
                control={control}
                rules={{
                  required: "New Password is required",
                  validate: (value) => {
                    if (value !== reNewPass) {
                      return "Password Mismatch";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type={isVisibleNewPass ? "text" : "password"}
                    size="small"
                    label="Type New Password"
                    placeholder="Type New Password"
                    fullWidth
                    autoFocus
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    autoComplete="newpass"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setVisibleNewPass(false)}
                            onMouseDown={() => setVisibleNewPass(true)}
                          >
                            {isVisibleNewPass ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="retypepass"
                control={control}
                rules={{
                  required: "Re-type New Password is required",
                  validate: (value) => {
                    if (value !== newPass) {
                      return "New Password Mismatch";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type={isVisibleRetypePass ? "text" : "password"}
                    size="small"
                    label="Re-type New Password"
                    placeholder="Re-type New Password"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    autoComplete="retypepass"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setVisibleRetypePass(false)}
                            onMouseDown={() => setVisibleRetypePass(true)}
                          >
                            {isVisibleRetypePass ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
            <Button
              size="small"
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Save Password
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SetPassword;
