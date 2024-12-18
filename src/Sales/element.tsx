import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { TableActionMenu } from "@/_shared/components/types/TableTypes";
import PrintIcon from "@mui/icons-material/Print";
import eyeFill from "@iconify/icons-eva/eye-fill";
import trashFill from "@iconify/icons-eva/trash-fill";
import editFill from "@iconify/icons-eva/edit-fill";
import { SalesField } from "./types";
import { UseFormReturn } from "react-hook-form";

export const headerElement = (
  isEditPageEnable: boolean,
  isAddPageEnable: boolean,
  isMainPageEnable: boolean,
  handlePageEnable: () => void,
  print: any,
  methods: UseFormReturn<SalesField>,
  onSubmit: (data: SalesField) => void
) => {
  return (
    <>
      {isMainPageEnable && (
        <>
          <Button
            color="success"
            size="small"
            variant="outlined"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            sx={{ marginLeft: "3px" }}
            onClick={handlePageEnable}
          >
            Add
          </Button>
          <Button
            color="success"
            onClick={print}
            variant="outlined"
            size="small"
            component={RouterLink}
            to="#"
            startIcon={<PrintIcon />}
            sx={{ marginRight: "3px" }}
          >
            Print
          </Button>
        </>
      )}
      {(isEditPageEnable || isAddPageEnable) && (
        <Button
          onClick={() => methods.handleSubmit(onSubmit)()}
          color="success"
          variant="outlined"
          size="small"
        >
          {isEditPageEnable ? (
            <>Save&nbsp;Transaction</>
          ) : (
            <>Add&nbsp;Transaction</>
          )}
        </Button>
      )}
    </>
  );
};

export const actionElement = (
  handleShowDeleteDialog: (row: any) => void,
  handleEditPageEnable: (row: any) => void,
  handleViewPageEnable: (row: any) => void
): TableActionMenu[] => {
  return [
    {
      label: "View",
      icon: eyeFill,
      type: "View", // view | edit | delete
      callback: (row) => {
        handleViewPageEnable(row);
      },
    },
    {
      label: "Edit",
      icon: editFill,
      type: "Edit", // view | edit | delete
      callback: (row) => {
        handleEditPageEnable(row);
      },
    },
    {
      label: "Delete",
      icon: trashFill,
      type: "Delete", // view | edit | delete
      callback: (row) => {
        handleShowDeleteDialog(row);
      },
    },
  ];
};
