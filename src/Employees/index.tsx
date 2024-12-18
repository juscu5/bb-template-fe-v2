import { useContext, useState } from "react";
import PageHeader from "@/_shared/components/PageHeader";
import { Table } from "@/_shared/components/Table";
import {
  getEmployeesQuery,
  addEmployeesQuery,
  editEmployeesQuery,
  deleteEmployeesQuery,
} from "./api";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { TableConfiguration } from "./config";
import { GlobalDialog } from "@/_shared/components/Dialog/GlobalDialog";
import { GlobalContext } from "@/_shared/context/GlobalContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useForm } from "react-hook-form";
import { getEmployeesFields } from "./fields";
import { actionElement, headerElement } from "./element";
import { EmployeesField } from "./types";
import { usePageCtrl } from "./hooks";
import { useGlobalDialogCtrl } from "@/_shared/hooks/GlobalDialogCtrl";
import { usePrintPdf } from "@/_shared/hooks/GlobalPrintReport";
import Form from "@/_shared/components/Form";
import dayjs from "dayjs";

export default function Employees() {
  const { useSnackBar } = useContext(GlobalContext);
  const { account } = useAccountStore();
  const { data, refetch } = getEmployeesQuery(account);
  const { tableHead, tableSettings } = TableConfiguration();
  const tableData = data?.data?.payload || [];
  const form = useForm<EmployeesField>();

  // Loading State
  const [isFormLoading, setFormLoading] = useState<boolean>(true);
  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
  delay(3000).then(() => setFormLoading(false));

  // Page and Dialog State
  const [headerTitle, setHeaderTitle] = useState<string>("Employees");
  const [primaryId, setPrimaryId] = useState<string | number>(0);
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
      fullname: "",
      age: "",
      esttotalincome: "",
      hiredate: "",
      deptcode: "",
      is_lock: false,
    });
    return formReset;
  };

  //print
  const print = usePrintPdf(tableData, tableHead, headerTitle, "landscape");

  // Handle Section
  const handleAddPageEnable = () => {
    setFormLoading(true);
    formState();
    setMainPageEnable(false);
    setAddPageEnable(true);
    setHeaderTitle("Add Employee");
  };

  const handleEditPageEnable = (row: any) => {
    setFormLoading(true);
    form.reset({
      fullname: row.fullname,
      age: row.age,
      esttotalincome: row.esttotalincome,
      hiredate: row.hiredate,
      deptcode: row.deptcode,
      is_lock: row.is_lock === 1 ? true : false,
    });
    setMainPageEnable(false);
    setEditPageEnable(true);
    setHeaderTitle("Employee No#: " + row.recid);
    setPrimaryId(row.recid);
  };

  const handleViewPageEnable = (row: any) => {
    setFormLoading(true);
    form.reset({
      fullname: row.fullname,
      age: row.age,
      esttotalincome: row.esttotalincome,
      hiredate: row.hiredate,
      deptcode: row.deptcode,
      is_lock: row.is_lock === 1 ? true : false,
    });
    setMainPageEnable(false);
    setViewPageEnable(true);
    setHeaderTitle("Employee No#: " + row.recid);
  };

  const handleShowDeleteDialog = (row: any) => {
    setDialogContent({
      dialogTitle: `Delete Employee No# ${row.recid}`,
      dialogContext: `Do you want to delete this Employee?`,
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
      setHeaderTitle("Employees");
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
      formData.is_lock = formData.is_lock ? 1 : 0;
      const res = await addEmployeesQuery(account, formData);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setAddPageEnable(false);
        setMainPageEnable(true);
        setHeaderTitle("Employees");
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Adding Employee Failed: ${error}`, { variant: "error" });
    }
    refetch();
  };

  const onSubmitEdit = async (row: any) => {
    try {
      row.is_lock = row.is_lock ? 1 : 0;
      const res = await editEmployeesQuery(account, primaryId, row);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setEditPageEnable(false);
        setMainPageEnable(true);
        setHeaderTitle("Employees");
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Employee Failed Update: ${error}`, { variant: "error" });
    }
    refetch();
  };

  const onSubmitDelete = async (row: any) => {
    try {
      const res = await deleteEmployeesQuery(row.recid, account);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setDialogOpen(false);
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Employee Failed Update: ${error}`, { variant: "error" });
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
                <Typography fontSize={13}>&nbsp; back to Employee</Typography>
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
                <Skeleton width={400} height={70} sx={{ mb: -2 }} />
                <Skeleton width={400} height={70} sx={{ mb: -2 }} />
                <Skeleton width={400} height={70} sx={{ mb: -2 }} />
                <Skeleton width={400} height={70} sx={{ mb: -2 }} />
                <Skeleton width={400} height={70} sx={{ mb: -0.5 }} />
                <Skeleton width={150} height={50} />
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
                formElements={getEmployeesFields(
                  isAddPageEnable,
                  isEditPageEnable,
                  isViewPageEnable,
                  account
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
