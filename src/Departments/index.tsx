import { useContext, useState } from "react";
import PageHeader from "@/_shared/components/PageHeader";
import { Table } from "@/_shared/components/Table";
import {
  getDepartmentsQuery,
  deleteDepartmentQuery,
  addDepartmentQuery,
  editDepartmentQuery,
} from "./api";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { TableConfiguration } from "./config";
import { GlobalDialog } from "@/_shared/components/Dialog/GlobalDialog";
import { GlobalContext } from "@/_shared/context/GlobalContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useForm } from "react-hook-form";
import { getDepartmentFields } from "./fields";
import { actionElement, headerElement } from "./element";
import { DepartmentField } from "./types";
import { usePageCtrl } from "./hooks";
import { useGlobalDialogCtrl } from "@/_shared/hooks/GlobalDialogCtrl";
import {
  useCheckedSystemParameters,
  useDocnumSystemParameters,
} from "@/_shared/hooks/SystemParameters";
import { usePrintPdf } from "@/_shared/hooks/GlobalPrintReport";
import Form from "@/_shared/components/Form";

export default function Departments() {
  const { useSnackBar } = useContext(GlobalContext);
  const { account } = useAccountStore();
  const { data, refetch } = getDepartmentsQuery(account);
  const { tableHead, tableSettings } = TableConfiguration();
  const { isDocnumChecked } = useCheckedSystemParameters("chkdeptdocnum");
  const { docNum, refetchSysPar } = useDocnumSystemParameters("deptdocnum");
  const tableData = data?.data?.payload || [];
  const form = useForm<DepartmentField>();

  // Loading State
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
  delay(3000).then(() => setFormLoading(false));

  // Page and Dialog State
  const [headerTitle, setHeaderTitle] = useState<string>("Department");
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

  //print
  const print = usePrintPdf(tableData, tableHead, headerTitle, "landscape");

  // Handle Section
  const handleAddPageEnable = () => {
    setFormLoading(true);
    form.reset({
      deptcode: isDocnumChecked ? docNum : "",
      deptdescription: "",
    });
    setMainPageEnable(false);
    setAddPageEnable(true);
    setHeaderTitle("Add Department");
  };

  const handleEditPageEnable = (row: any) => {
    setFormLoading(true);
    form.reset({
      deptcode: row.deptcode,
      deptdescription: row.deptdescription,
    });
    setMainPageEnable(false);
    setEditPageEnable(true);
    setHeaderTitle("Department Code#: " + row.deptcode);
  };

  const handleViewPageEnable = (row: any) => {
    setFormLoading(true);
    form.reset({
      deptcode: row.deptcode,
      deptdescription: row.deptdescription,
    });
    setMainPageEnable(false);
    setViewPageEnable(true);
    setHeaderTitle("Department Code#: " + row.deptcode);
  };

  const handleShowDeleteDialog = (row: any) => {
    setDialogContent({
      dialogTitle: "Delete",
      dialogContext: "Do you want to delete this Item?",
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

  const handleBackButton = () => {
    const setEnable = () => {
      setMainPageEnable(true);
      setAddPageEnable(false);
      setEditPageEnable(false);
      setViewPageEnable(false);
      setHeaderTitle("Department");
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

  // Submit Section
  const onSubmitAdd = async () => {
    try {
      const formData = form.getValues();
      const res = await addDepartmentQuery(account, formData, isDocnumChecked);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setAddPageEnable(false);
        setMainPageEnable(true);
        setHeaderTitle("Department");
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Adding Deparment Failed: ${error}`, { variant: "error" });
    }
    refetchSysPar();
    refetch();
  };

  const onSubmitEdit = async (row: any) => {
    try {
      const res = await editDepartmentQuery(account, row.deptcode, row);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setEditPageEnable(false);
        setMainPageEnable(true);
        setHeaderTitle("Department");
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Department Failed Update: ${error}`, { variant: "error" });
    }
    refetch();
  };

  const onSubmitDelete = async (row: any) => {
    try {
      const res = await deleteDepartmentQuery(row.deptcode, account);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setDialogOpen(false);
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Department Failed Update: ${error}`, { variant: "error" });
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
                <Typography fontSize={13}>&nbsp; back to Department</Typography>
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
                <Skeleton width={400} height={70} sx={{ mb: -1.5 }} />
                <Skeleton width={400} height={70} sx={{ mb: -0.5 }} />
                <Skeleton width={150} height={50} />
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
              <Form
                form={form}
                isLoading={false}
                onSubmit={
                  isAddPageEnable
                    ? onSubmitAdd
                    : () => onSubmitEdit(form.getValues())
                }
                formElements={getDepartmentFields(
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
