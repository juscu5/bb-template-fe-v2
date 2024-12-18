import { useContext, useState } from "react";
import PageHeader from "@/_shared/components/PageHeader";
import { Table } from "@/_shared/components/Table";
import {
  addSaleTransaction,
  deleteSaleTransaction,
  editSaleTransaction,
  getSalesItemsQuery,
  getSalesQuery,
} from "./api";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { TableConfiguration } from "./config";
import { GlobalDialog } from "@/_shared/components/Dialog/GlobalDialog";
import { GlobalContext } from "@/_shared/context/GlobalContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { actionElement, headerElement } from "./element";
import { usePageCtrl } from "./hooks";
import { useGlobalDialogCtrl } from "@/_shared/hooks/GlobalDialogCtrl";
import { usePrintPdf } from "@/_shared/hooks/GlobalPrintReport";
import { PageConfiguration } from "./config";
import { SysParConfiguration } from "./config";
import {
  useCheckedSystemParameters,
  useDocnumSystemParameters,
} from "@/_shared/hooks/SystemParameters";
import SalesForm from "./components/SalesForm/";
import { getCustomersQuery } from "@/Customers/api";
import { useAuthStore } from "@/_shared/store/AuthStore";
import { FormProvider, useForm } from "react-hook-form";
import { SalesField } from "./types";
import { SalesLoadingSkeleton } from "./components/SalesSkeleton";

export default function Sales() {
  const { useSnackBar } = useContext(GlobalContext);
  const { account } = useAccountStore();
  const { user } = useAuthStore();
  const { data, refetch } = getSalesQuery(account);
  const { data: custData, refetch: custRefetch } = getCustomersQuery(account);

  // Configuration
  const { title } = PageConfiguration();
  const { tableHead, tableSettings } = TableConfiguration();
  const { DocnumConfig } = SysParConfiguration();

  // Data and Form
  const tableData = data?.data?.payload || [];
  const customer = custData?.data?.payload || [];
  const methods = useForm<SalesField>();

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

  const formState = () => {
    const formReset = methods.reset({
      salesDetails: {
        docnum: isDocnumChecked ? docNum : "",
        refnum: "",
        trndte: "",
        smncde: "",
        ewtcde: "",
        evatcde: "",
        usrcde: user?.usrcde,
        trmcde: "",
        cuscde: "",
        cusdsc: "",
        shipto: "",
        preby: "",
        advdoc: "",
        remarks: "",
        chkby: "",
        apvby: "",
        totamtdisfor: 0,
      },
    });
    return formReset;
  };
  const {
    data: salesItemData,
    refetch: salesItemRefetch,
    isSuccess,
  } = getSalesItemsQuery(account, primaryId);

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
    setViewPageEnable(false);
    setEditPageEnable(false);
    setHeaderTitle(title[0].addPageHeaderTitle);
  };

  const handleEditPageEnable = (row: any) => {
    const fields = methods.getValues("salesDetails");
    const fieldsWithValues = Object.entries(fields).reduce(
      (acc: any, [key]: any) => {
        acc[key] = row[key];
        return acc;
      },
      {}
    );
    setFormLoading(true);
    methods.reset({
      salesDetails: { ...fieldsWithValues, usrcde: user?.usrcde },
    });
    setMainPageEnable(false);
    setViewPageEnable(false);
    setEditPageEnable(true);
    setHeaderTitle(
      DocnumConfig[0].isNotDocnum
        ? title[0].editPageHeaderTitle + " " + row.recid
        : title[0].editPageHeaderTitle +
            " " +
            row[`${DocnumConfig[0].tableDocnum}`]
    );
    setPrimaryId(row.docnum);
  };

  const handleViewPageEnable = (row: any) => {
    const fields = methods.getValues("salesDetails");
    const fieldsWithValues = Object.entries(fields).reduce(
      (acc: any, [key]: any) => {
        acc[key] = row[key];
        return acc;
      },
      {}
    );
    setFormLoading(true);
    methods.reset({
      salesDetails: { ...fieldsWithValues, usrcde: user?.usrcde },
    });
    setMainPageEnable(false);
    setEditPageEnable(false);
    setViewPageEnable(true);
    setHeaderTitle(
      DocnumConfig[0].isNotDocnum
        ? title[0].viewPageHeaderTitle + " " + row.recid
        : title[0].viewPageHeaderTitle +
            " " +
            row[`${DocnumConfig[0].tableDocnum}`]
    );
    setPrimaryId(row.docnum);
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
  const onSubmit = (data: SalesField) => {
    if (isAddPageEnable) {
      onSubmitAdd(data);
    } else if (isEditPageEnable) {
      onSubmitEdit(data);
    }
  };

  const onSubmitAdd = async (data: SalesField) => {
    try {
      const finalDocnum = data.salesDetails.docnum;
      const salesItem = data.salesItem.map((item) => ({
        ...item,
        docnum: finalDocnum,
      }));
      const finalData = {
        salesDetails: data.salesDetails,
        salesItem: salesItem,
      };
      const res = await addSaleTransaction(account, finalData, isDocnumChecked);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setAddPageEnable(false);
        setEditPageEnable(false);
        setViewPageEnable(false);
        setMainPageEnable(true);
        setHeaderTitle(title[0].mainPageHeaderTitle);
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data?.payload?.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Adding Items Failed: ${error}`, { variant: "error" });
    }
    salesItemRefetch();
    refetchSysPar();
    refetch();
  };

  const onSubmitEdit = async (data: SalesField) => {
    try {
      const finalDocnum = data.salesDetails.docnum;
      const salesItem = data.salesItem.map((item) => ({
        ...item,
        docnum: finalDocnum,
      }));
      const finalData = {
        salesDetails: data.salesDetails,
        salesItem: salesItem,
      };
      const res = await editSaleTransaction(account, finalDocnum, finalData);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setAddPageEnable(false);
        setEditPageEnable(false);
        setViewPageEnable(false);
        setMainPageEnable(true);
        setHeaderTitle(title[0].mainPageHeaderTitle);
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data?.payload?.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Adding Items Failed: ${error}`, { variant: "error" });
    }
    salesItemRefetch();
    refetchSysPar();
    refetch();
  };

  const onSubmitDelete = async (row: any) => {
    try {
      const res = await deleteSaleTransaction(row.docnum, account);
      if (res.status === "Success") {
        useSnackBar(res.payload?.msg, { variant: "success" });
        setDialogOpen(false);
      } else {
        useSnackBar(res.payload?.msg, { variant: "error" });
      }
    } catch (e: any) {
      const errorMessage = e.response.data.payload.msg;
      const error = errorMessage ? errorMessage : e;
      useSnackBar(`Customer Failed Update: ${error}`, { variant: "error" });
    }
    salesItemRefetch();
    refetchSysPar();
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
                isEditPageEnable,
                isAddPageEnable,
                isMainPageEnable,
                handleAddPageEnable,
                print,
                methods,
                onSubmit
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
            <Divider sx={{ ml: 3, mr: 3 }} />
            {isFormLoading && !isMainPageEnable && SalesLoadingSkeleton()}
            <Box
              ml={3}
              mt={-1}
              pt={2}
              display={
                !isFormLoading &&
                (isAddPageEnable || isEditPageEnable || isViewPageEnable)
                  ? "inherit"
                  : "none"
              }
            >
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <SalesForm
                    isDocnumChecked={isDocnumChecked}
                    docNum={docNum}
                    customer={customer}
                    user={user?.usrcde}
                    primaryId={primaryId}
                    isAddPageEnable={isAddPageEnable}
                    isEditPageEnable={isEditPageEnable}
                    isViewPageEnable={isViewPageEnable}
                    salesItemData={salesItemData}
                    isSuccess={isSuccess}
                  />
                </form>
              </FormProvider>
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
