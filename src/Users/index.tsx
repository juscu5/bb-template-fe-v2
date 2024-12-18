import { useContext, useState } from "react";
import PageHeader from "@/_shared/components/PageHeader";
import { Table } from "@/_shared/components/Table";
import {
  getUsersQuery,
  addUserQuery,
  editUserQuery,
  deleteUserQuery,
} from "./api";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { TableConfiguration } from "./config";
import { GlobalDialog } from "@/_shared/components/Dialog/GlobalDialog";
import { GlobalContext } from "@/_shared/context/GlobalContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useForm } from "react-hook-form";
import { getFields } from "./fields";
import { actionElement, headerElement } from "./element";
import { UsersField } from "./types";
import { usePageCtrl } from "./hooks";
import { useGlobalDialogCtrl } from "@/_shared/hooks/GlobalDialogCtrl";
import { usePrintPdf } from "@/_shared/hooks/GlobalPrintReport";
import Form from "@/_shared/components/Form";
import { PageConfiguration } from "./config";
import { SysParConfiguration } from "./config";
import {
  useCheckedSystemParameters,
  useDocnumSystemParameters,
} from "@/_shared/hooks/SystemParameters";

export default function Users() {
  const { useSnackBar } = useContext(GlobalContext);
  const { account } = useAccountStore();
  const { data, refetch } = getUsersQuery(account);

  // Configuration
  const { title } = PageConfiguration();
  const { tableHead, tableSettings } = TableConfiguration();
  const { DocnumConfig } = SysParConfiguration();

  // Data and Form
  const tableData = data?.data?.payload || [];
  const form = useForm<UsersField>();

  // System Parameters
  const { isDocnumChecked } = useCheckedSystemParameters(
    DocnumConfig[0].docnumCheck
  );
  const { docNum, refetchSysPar } = useDocnumSystemParameters(
    DocnumConfig[0].docnumCode
  );

  // Loading State
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
  delay(3000).then(() => setFormLoading(false));

  // Page and Dialog State
  const [headerTitle, setHeaderTitle] = useState<string>(
    title[0].mainPageHeaderTitle
  );
  const [primaryId, setPrimaryId] = useState<string | number>(0); //use this on onSubmit if not using docnum
  const { isDialogOpen, setDialogOpen, dialogContent, setDialogContent } =
    useGlobalDialogCtrl();
  const {
    isMainPageEnable,
    isAddPageEnable,
    isEditPageEnable,
    isViewPageEnable,
    setMainPageEnable,
    setAddPageEnable,
    setEditPageEnable,
    setViewPageEnable,
  } = usePageCtrl();

  // Form State
  const formState = () => {
    const formReset = form.reset({
      usrname: "",
      usrpwd: "",
      usrlvl: "",
      emailadd: "",
      fullname: "",
    });
    return formReset;
  };

  // Print
  const print = usePrintPdf(tableData, tableHead, headerTitle, "landscape");

  // Handle Section
  const handleBackButton = () => {
    const setEnable = () => {
      setMainPageEnable(true);
      setAddPageEnable(false);
      setEditPageEnable(false);
      setViewPageEnable(false);
      setHeaderTitle(title[0].mainPageHeaderTitle);
    };

    if (isViewPageEnable) {
      setEnable();
    } else {
      const handleYes = () => {
        setDialogOpen(false);
        setEnable();
      };
      setDialogContent({
        dialogTitle: "Information",
        dialogContext: "Are you sure you want to go back?",
        dialogOnClick: [
          {
            text: "Yes",
            textColor: "warning",
            onClick: handleYes,
          },
        ],
      });
      setDialogOpen(true);
    }
  };

  const handleAddPageEnable = () => {
    setFormLoading(true);
    formState();
    setMainPageEnable(false);
    setAddPageEnable(true);
    setHeaderTitle(title[0].addPageHeaderTitle);
  };

  const handleEditPageEnable = (row: any) => {
    const fields = form.getValues();
    const fieldsWithValues = Object.entries(fields).reduce(
      (acc: any, [key]: any) => {
        acc[key] = row[key];
        return acc;
      },
      {}
    );
    setFormLoading(true);
    form.reset(fieldsWithValues);
    setMainPageEnable(false);
    setEditPageEnable(true);
    setHeaderTitle(
      DocnumConfig[0].isNotDocnum
        ? title[0].viewPageHeaderTitle + " " + row.recid
        : title[0].viewPageHeaderTitle +
            " " +
            row[`${DocnumConfig[0].tableDocnum}`]
    );
    setPrimaryId(row.recid);
  };

  const handleViewPageEnable = (row: any) => {
    const fields = form.getValues();
    const fieldsWithValues = Object.entries(fields).reduce(
      (acc: any, [key]: any) => {
        acc[key] = row[key];
        return acc;
      },
      {}
    );
    setFormLoading(true);
    form.reset(fieldsWithValues);
    setMainPageEnable(false);
    setViewPageEnable(true);
    setHeaderTitle(
      DocnumConfig[0].isNotDocnum
        ? title[0].viewPageHeaderTitle + " " + row.recid
        : title[0].viewPageHeaderTitle +
            " " +
            row[`${DocnumConfig[0].tableDocnum}`]
    );
  };

  const handleShowDeleteDialog = (row: any) => {
    const deleteTitle = DocnumConfig[0].isNotDocnum
      ? title[0].mainPageHeaderTitle + "#: " + row.recid
      : title[0].mainPageHeaderTitle +
        "# " +
        row[`${DocnumConfig[0].tableDocnum}`];
    setDialogContent({
      dialogTitle: `Delete ${title[0].mainPageHeaderTitle}`,
      dialogContext: `Do you want to delete this ${deleteTitle}?`,
      dialogOnClick: [
        {
          text: "Delete",
          textColor: "error",
          onClick: () => onSubmitDelete(row),
        },
      ],
    });
    setDialogOpen(true);
  };

  // Submit Section
  const onSubmitAdd = async () => {
    try {
      const formData = form.getValues();
      const res = await addUserQuery(account, formData);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setAddPageEnable(false);
        setMainPageEnable(true);
        setHeaderTitle(title[0].mainPageHeaderTitle);
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data?.payload?.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Error: ${error}`, { variant: "error" });
    }
    refetch();
  };

  const onSubmitEdit = async (row: any) => {
    try {
      const res = await editUserQuery(account, primaryId, row);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setEditPageEnable(false);
        setMainPageEnable(true);
        setHeaderTitle(title[0].mainPageHeaderTitle);
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Error: ${error}`, { variant: "error" });
    }
    refetch();
  };

  const onSubmitDelete = async (row: any) => {
    try {
      const res = await deleteUserQuery(row.recid, account);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setDialogOpen(false);
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Error: ${error}`, { variant: "error" });
    }
    refetch();
  };

  return (
    <>
      <Box m={2}>
        <Grid container columns={6} flexDirection="inherit">
          <Grid item md={24} ml={2} mr={2}>
            {!isMainPageEnable && (
              <Button color="info" size="small" onClick={handleBackButton}>
                <KeyboardBackspaceIcon fontSize="medium" />
                <Typography fontSize={13}>
                  &nbsp; back to {title[0].mainPageHeaderTitle}
                </Typography>
              </Button>
            )}
          </Grid>
          <Grid item md={6}>
            <PageHeader
              title={headerTitle}
              element={headerElement(
                isMainPageEnable,
                handleAddPageEnable,
                print
              )}
            />
          </Grid>
          <Grid item md={6}>
            {isMainPageEnable && (
              <Table
                title={headerTitle}
                tableHead={tableHead}
                tableData={tableData}
                tableSettings={tableSettings}
                actionElement={actionElement(
                  handleShowDeleteDialog,
                  handleEditPageEnable,
                  handleViewPageEnable
                )}
              />
            )}
            {isFormLoading && !isMainPageEnable && (
              <Box ml={3} mt={-1} pt={1} borderTop="1px solid #ccc">
                <Grid container>
                  <Grid item md={6}>
                    <Skeleton width="100%" height={70} sx={{ mb: -2 }} />
                    <Skeleton width="100%" height={70} sx={{ mb: -1 }} />
                    <Skeleton width="20%" height={50} />
                  </Grid>
                </Grid>
              </Box>
            )}
            <Box
              ml={3}
              mt={-1}
              pt={2}
              borderTop="1px solid #ccc"
              display={
                !isFormLoading &&
                (isAddPageEnable || isEditPageEnable || isViewPageEnable)
                  ? "inherit"
                  : "none"
              }
            >
              <Grid container justifyContent="left">
                <Grid item xs={12} sm={8} md={6} justifySelf={"left"}>
                  <Form
                    form={form}
                    isLoading={false}
                    onSubmit={
                      isAddPageEnable
                        ? onSubmitAdd
                        : () => onSubmitEdit(form.getValues())
                    }
                    formElements={getFields(
                      isAddPageEnable,
                      isEditPageEnable,
                      isViewPageEnable
                    )}
                    isSubmitButtonEnable={isViewPageEnable ? false : true}
                    submitButtonText={
                      isAddPageEnable
                        ? `${headerTitle}`
                        : isEditPageEnable
                        ? `Save`
                        : ""
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <GlobalDialog
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        title={dialogContent.dialogTitle}
        context={dialogContent.dialogContext}
        buttonText={dialogContent.dialogOnClick}
      />
    </>
  );
}
