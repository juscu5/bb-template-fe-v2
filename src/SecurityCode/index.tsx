import { GlobalContext } from "@/_shared/context/GlobalContext";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { Box, Divider, Grid } from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { SecurityCodesFields } from "./types";
import PageHeader from "@/_shared/components/PageHeader";
import Form from "@/_shared/components/Form";
import { getDetailsFields, getSecFields } from "./fields";
import { addItemsQuery } from "./api";

const SecurityCode = () => {
  const { account } = useAccountStore();
  const { useSnackBar } = useContext(GlobalContext);
  const secCodeform = useForm<SecurityCodesFields>({
    defaultValues: {
      seccde: localStorage.getItem("seccde") || "",
    },
  });
  const secDetailsform = useForm<SecurityCodesFields>({
    defaultValues: {
      company_code: localStorage.getItem("company_code") || "",
      company_no: localStorage.getItem("company_no") || "",
      serialno: localStorage.getItem("serialno") || "",
      warningcode1: localStorage.getItem("warningcode1") || "",
      expringdate: localStorage.getItem("expringdate") || "",
    },
  });

  const onSubmitSecCode = async () => {
    try {
      const data = {
        ischeck: false,
        seccde: secCodeform.getValues("seccde"),
        ismobile: false,
        imei: "819-166323",
        company_no: "819000",
        lstpos: {},
      };
      const postSecCode = await addItemsQuery(account, data);
      if (postSecCode.payload.data.invalidcode === false) {
        secDetailsform.reset({
          seccde: secCodeform.getValues("seccde"),
          company_code: postSecCode.payload.data.lstcom.company_code,
          company_no: postSecCode.payload.data.lstcom.company_no,
          serialno: postSecCode.payload.data.lstpos.serialno,
          warningcode1: postSecCode.payload.data.warningcode1,
          expringdate: postSecCode.payload.data.expringdate,
        });
        localStorage.setItem("seccde", secCodeform.getValues("seccde"));
        localStorage.setItem(
          "serialno",
          postSecCode.payload.data.lstpos.serialno
        );
        localStorage.setItem(
          "company_code",
          postSecCode.payload.data.lstcom.company_code
        );
        localStorage.setItem(
          "company_no",
          postSecCode.payload.data.lstcom.company_no
        );
        localStorage.setItem(
          "warningcode1",
          postSecCode.payload.data.warningcode1
        );
        localStorage.setItem(
          "expringdate",
          postSecCode.payload.data.expringdate
        );
        useSnackBar("Success! You are register!", {
          variant: "success",
        });
      } else {
        secDetailsform.reset({
          seccde: "",
          company_code: "",
          company_no: "",
          serialno: "",
          warningcode1: "",
          expringdate: "",
        });
        localStorage.removeItem("serialno");
        localStorage.removeItem("company_code");
        localStorage.removeItem("company_no");
        localStorage.removeItem("warningcode1");
        localStorage.removeItem("expringdate");
        useSnackBar("Invalid Code. Can't Proceed", {
          variant: "error",
        });
      }
    } catch (e: any) {
      useSnackBar("Can't proceed " + e, {
        variant: "error",
      });
    }
  };

  return (
    <Box>
      <Grid container columns={12}>
        <Grid item xs={12} md={12} ml={3} mr={3}>
          <PageHeader title="Security Code" />
          <Divider sx={{ ml: 3, mr: 3 }} />
        </Grid>
        <Grid item xs={12} md={12} ml={3} mr={3}>
          <Grid container columns={12}>
            <Grid item xs={12} md={4}>
              <Box ml={3} mr={3} pt={2}>
                <Form
                  form={secCodeform}
                  isLoading={false}
                  onSubmit={onSubmitSecCode}
                  formElements={getSecFields()}
                  isSubmitButtonEnable={true}
                  submitButtonText="Submit Security Code"
                />
              </Box>
              <Box ml={3} mr={3} mt={-1} pt={2}>
                <Form
                  form={secDetailsform}
                  isLoading={false}
                  onSubmit={onSubmitSecCode}
                  formElements={getDetailsFields()}
                  isSubmitButtonEnable={false}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecurityCode;
