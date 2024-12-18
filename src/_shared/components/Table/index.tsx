import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Container,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { TableProps } from "../types/TableTypes";
import { TableHeader } from "./TableHeader";
import { Icon } from "@iconify/react";
import { TableSettings } from "./TableSettings";
import { TableLayout } from "./TableLayout";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#597445",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#597445",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export const Table = <T extends any[]>({
  title,
  tableHead,
  tableData,
  tableSettings,
  actionDialog,
  refetch,
  enableTitle,
  setItemToAdd,
  placeholder,
  enableCheckbox,
  actionElement,
  setSelectedCheckData,
}: TableProps<T>): JSX.Element => {
  const { sysParam } = TableSettings({ tableSettings });

  const { table } = TableLayout({
    title,
    tableHead,
    tableData,
    tableSettings,
    actionDialog,
    refetch,
    enableTitle,
    setItemToAdd,
    placeholder,
    enableCheckbox,
    actionElement,
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedData = selectedRows.map((row: any) => row.original);
  useEffect(() => {
    if (setItemToAdd) {
      setItemToAdd(selectedData);
    }
  }, [selectedData, setItemToAdd]);

  setSelectedCheckData?.(selectedData);

  // PrintPDF
  //   const orientation = "landscape";
  //   const generatePdf = usePdfPrint(tableData, tableHead!, orientation);

  return (
    <>
      <Box title={title}>
        <Container maxWidth={false}>
          {/* {enableTitle === undefined || enableTitle === null ? (
            <LSTVPageTitle title={title!} element={element} />
          ) : (
            <></>
          )} */}
          {sysParam && (
            <>
              <Stack mb={1} />
              <Divider>{title} Parameters</Divider>
              <Stack mb={1} />
              <Grid container spacing={1}>
                <Grid xs={15}>
                  {/* <LSTVMaxRec refetch1={() => refetch?.()} /> */}
                </Grid>
              </Grid>
            </>
          )}
          {!sysParam && (
            <>
              <Stack mb={1} />
            </>
          )}
          <Box
            component="form"
            sx={{
              overflow: "auto",
              width: "100%",
              display: "table",
              tableLayout: "fixed",
            }}
          >
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MaterialReactTable table={table} />
                {actionDialog?.()}
              </LocalizationProvider>
            </ThemeProvider>
          </Box>
        </Container>
      </Box>
    </>
  );
};
