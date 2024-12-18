import PageHeader from "@/_shared/components/PageHeader";
import { Table } from "@/_shared/components/Table";
import { Box, Button, Divider, Grid, Stack, TextField } from "@mui/material";
import { TableConfiguration } from "./config";
import { getUserActivityLogQuery } from "./api";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/_shared/context/GlobalContext";
import { Controller, useForm } from "react-hook-form";
import { MaxRecordField } from "./types";
import { getSystemParameters, putSysParameters } from "@/_shared/api/SysparApi";
import { useCreateLog } from "@/_shared/store/ActivityLogsStore";

const UserActivityLog = () => {
  const { account } = useAccountStore();
  const { useSnackBar } = useContext(GlobalContext);
  const { data, refetch } = getUserActivityLogQuery(account);
  const { data: sysparData, refetch: sysparRefetch } = getSystemParameters();
  const { tableHead, tableSettings } = TableConfiguration();
  const { createLogs } = useCreateLog();
  const tableData = data?.data?.payload || [];
  const userMaxLogRec = sysparData?.data?.payload[0].userlogmaxrec;

  const { control, handleSubmit, reset } = useForm<MaxRecordField>();

  useEffect(() => {
    reset({ userlogmaxrec: userMaxLogRec });
  }, [userMaxLogRec]);

  const onSubmit = async (data: any) => {
    try {
      const res = await putSysParameters(data, account);
      const module = "User Activity Log";
      const activity = "Change Max Records";
      const remarks = res.payload?.msg;
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        createLogs(module, activity, remarks);
        refetch();
        sysparRefetch();
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
        createLogs(module, activity, remarks);
        refetch();
        sysparRefetch();
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Updating Max Record Failed: ${error}`, { variant: "error" });
    }
  };

  return (
    <Box>
      <Grid container columns={12} flexDirection="inherit">
        <Grid item xs={12} md={12} ml={3} mr={3}>
          <PageHeader title="User Activity Log" />
          <Divider sx={{ ml: 3, mr: 3 }} />
        </Grid>
        <Grid item xs={12} md={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={1}
              direction="row"
              ml={6}
              mr={3}
              mt={2}
              mb={2}
              justifyContent="center"
            >
              <Controller
                name="userlogmaxrec"
                control={control}
                rules={{
                  required: "Max record required",
                  validate: (value: number) => {
                    if (value === userMaxLogRec) {
                      return "Value already set, please set a new value";
                    }
                    return true;
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    type="number"
                    size="small"
                    label="User Log Max Record"
                    placeholder="User Log Max Record"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                    sx={{
                      width: "20%",
                    }}
                    autoComplete="userlogmaxrec"
                  />
                )}
              />

              <Button
                size="small"
                variant="contained"
                type="submit"
                sx={{ width: "10%" }}
              >
                Save Max Record
              </Button>
            </Stack>
          </form>
        </Grid>
        <Grid item xs={12} md={12} ml={3} mr={3}>
          <Divider sx={{ ml: 3, mr: 3, mb: 2 }} />
          <Table
            title="User Activity Log"
            tableHead={tableHead}
            tableData={tableData}
            tableSettings={tableSettings}
          />
          <Divider sx={{ ml: 3, mr: 3 }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserActivityLog;
