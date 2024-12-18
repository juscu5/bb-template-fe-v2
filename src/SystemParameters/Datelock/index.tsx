import { Box, Grid } from "@mui/material";
import DatelockForm from "./form";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { useContext } from "react";
import { getSystemParameters, putSysParameters } from "@/_shared/api/SysparApi";
import { GlobalContext } from "@/_shared/context/GlobalContext";

const Datelock = () => {
  const { account } = useAccountStore();
  const { useSnackBar } = useContext(GlobalContext);
  const { data, refetch } = getSystemParameters();
  const sysParData = data?.data?.payload[0] || "";

  const onSubmit = async (data: any) => {
    try {
      const postSysPar = await putSysParameters(data, account);
      if (postSysPar.status === "Success") {
        useSnackBar("Datelock has been updated!", { variant: "success" });
        refetch();
      } else {
        useSnackBar(postSysPar!.payload!.msg, { variant: "success" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Datelock Failed Save: ${error}`, { variant: "error" });
    }
  };

  return (
    <Box>
      <Grid container columns={12}>
        <Grid item xs={12} md={12}>
          <DatelockForm onSubmit={onSubmit} sysParData={sysParData}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Datelock;
