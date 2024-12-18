import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { SalesField, SalesDetailsProps } from "../../types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SalesDetails = ({
  isDocnumChecked,
  customer,
  isViewPageEnable,
}: SalesDetailsProps) => {
  const { control, watch, setValue, getFieldState } =
    useFormContext<SalesField>();

  const hasInvalidSalesDetails =
    getFieldState("salesDetails.docnum").invalid ||
    getFieldState("salesDetails.refnum").invalid ||
    getFieldState("salesDetails.trndte").invalid ||
    getFieldState("salesDetails.smncde").invalid ||
    getFieldState("salesDetails.ewtcde").invalid ||
    getFieldState("salesDetails.evatcde").invalid ||
    getFieldState("salesDetails.usrcde").invalid ||
    getFieldState("salesDetails.trmcde").invalid;

  const hasInvalidCustomerDetails =
    getFieldState("salesDetails.cuscde").invalid ||
    getFieldState("salesDetails.shipto").invalid;

  const hasInvalidAdditionalDetails =
    getFieldState("salesDetails.preby").invalid ||
    getFieldState("salesDetails.chkby").invalid ||
    getFieldState("salesDetails.apvby").invalid ||
    getFieldState("salesDetails.remarks").invalid;

  const cuscde = watch("salesDetails.cuscde");
  const shipto = customer
    ?.filter((cust: any) => cust.cuscde === cuscde)
    .map((cust: any) => [
      { id: cust.cusadd1, name: cust.cusadd1 },
      { id: cust.cusadd2, name: cust.cusadd2 },
    ])
    .flat();

  useEffect(() => {
    if (shipto && shipto.length > 0) {
      setValue("salesDetails.shipto", shipto[0].id);
    }
  }, [cuscde, shipto, setValue]);

  // Direct default expanded isn't working on Accordion, this is the alternative way
  const [isExpandedCust, setExpandedCust] = useState(isViewPageEnable);
  const [isExpandedAdd, setExpandedAdd] = useState(isViewPageEnable);
  useEffect(() => {
    setExpandedAdd(isViewPageEnable);
    setExpandedCust(isViewPageEnable);
  }, [isViewPageEnable]);

  const salesMan = [
    "John Doe",
    "Johnny Diaz",
    "Christopher Nolan",
    "Ricardo Martinez",
    "Lebron James",
  ];

  const ewtCode = [
    "PROF FEES",
    "RENT",
    "SAL GOODS",
    "SAL SERVICES",
    "SJ SERVICES",
  ];

  const evatCode = ["SAL SERVICES", "SJ SERVICES", "VAT EXEMPT"];

  const terms = [
    "30 Days",
    "45 Days",
    "60 Days",
    "90 Days",
    "COD",
    "Installment",
  ];

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container columns={12} pr={3}>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                mr: 3,
                pointerEvents: isViewPageEnable ? "none" : "auto",
                opacity: isViewPageEnable ? 0.7 : 1,
              }}
            >
              <Box>
                <Accordion
                  defaultExpanded
                  variant="outlined"
                  sx={{ border: "none" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      flexDirection: "row-reverse",
                      p: 0,
                      "&:not(.Mui-expanded)": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      color={hasInvalidSalesDetails ? "#d32f2f" : "inherit"}
                    >
                      &nbsp;&nbsp;&nbsp;Sales Details *
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ ml: -2 }}>
                    <Stack
                      spacing={2}
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      useFlexGap
                      flexWrap="wrap"
                      mr={3}
                    >
                      <Controller
                        name="salesDetails.docnum"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Document no# is required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="text"
                            size="small"
                            label="Document No#"
                            disabled={isDocnumChecked ? true : false}
                            placeholder="Docnumnet No#"
                            fullWidth={false}
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                          />
                        )}
                      />
                      <Controller
                        name="salesDetails.refnum"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Reference no# is required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="text"
                            size="small"
                            label="Reference No#"
                            disabled={false}
                            placeholder="Reference No#"
                            fullWidth={false}
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                          />
                        )}
                      />
                      <Controller
                        name="salesDetails.trndte"
                        control={control}
                        rules={{
                          required: "Transaction date is Required",
                          validate: (value) => {
                            if (
                              value &&
                              !dayjs(dayjs(value), "MM/DD/YYYY", true).isValid()
                            ) {
                              return "Invalid date";
                            }
                            return true;
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <DatePicker
                            {...field}
                            label="Transaction Date"
                            autoFocus={true}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => {
                              const formattedDate = date
                                ? dayjs(date).format("MM/DD/YYYY").toString()
                                : null;
                              field.onChange(formattedDate);
                            }}
                            slotProps={{
                              textField: {
                                size: "small",
                                error: !!fieldState.error,
                                helperText: fieldState.error
                                  ? fieldState.error.message
                                  : "",
                              },
                            }}
                            sx={{ width: 223 }}
                          />
                        )}
                      />
                      <Controller
                        name="salesDetails.smncde"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Salesman is Required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            size="small"
                            label="Salesman"
                            disabled={false}
                            placeholder="Salesman"
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                            sx={{
                              width: 223,
                            }}
                          >
                            <MenuItem key="" value="" sx={{ color: "gray" }}>
                              (please select option)
                            </MenuItem>
                            {salesMan.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                      <Controller
                        name="salesDetails.ewtcde"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "EWT code is Required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            size="small"
                            label="EWT Code"
                            disabled={false}
                            placeholder="EWT Code"
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                            sx={{
                              width: 223,
                            }}
                          >
                            <MenuItem key="" value="" sx={{ color: "gray" }}>
                              (please select option)
                            </MenuItem>
                            {ewtCode.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                      <Controller
                        name="salesDetails.evatcde"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "EVAT code is Required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            size="small"
                            label="EVAT Code"
                            disabled={false}
                            placeholder="EVAT Code"
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                            sx={{
                              width: 223,
                            }}
                          >
                            <MenuItem key="" value="" sx={{ color: "gray" }}>
                              (please select option)
                            </MenuItem>
                            {evatCode.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                      <Controller
                        name="salesDetails.usrcde"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "User code# is required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="text"
                            size="small"
                            label="User Code#"
                            disabled={true}
                            placeholder="User Code#"
                            fullWidth={false}
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                          />
                        )}
                      />
                      <Controller
                        name="salesDetails.trmcde"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Terms is Required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            size="small"
                            label="Terms"
                            disabled={false}
                            placeholder="Terms"
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                            sx={{
                              width: 223,
                            }}
                          >
                            <MenuItem key="" value="" sx={{ color: "gray" }}>
                              (please select option)
                            </MenuItem>
                            {terms.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box>
                <Accordion
                  expanded={isExpandedCust}
                  onChange={() => setExpandedCust(!isExpandedCust)}
                  variant="outlined"
                  sx={{ border: "none" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      flexDirection: "row-reverse",
                      p: 0,
                      "&.Mui-expanded": {
                        borderTop: "1px solid rgb(231, 231, 231)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      color={hasInvalidCustomerDetails ? "#d32f2f" : "inherit"}
                    >
                      &nbsp;&nbsp;&nbsp;Customer Details *
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ ml: -2 }}>
                    <Stack
                      spacing={2}
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      useFlexGap
                      flexWrap="wrap"
                      mr={3}
                    >
                      <Controller
                        name="salesDetails.cuscde"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Customer Code is Required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            size="small"
                            label="Customer Desciption"
                            disabled={false}
                            placeholder="Docnumnet No#"
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                            sx={{
                              width: {
                                xs: 223,
                                sm: 280,
                              },
                            }}
                          >
                            <MenuItem key="" value="" sx={{ color: "gray" }}>
                              (please select option)
                            </MenuItem>
                            {customer?.map(
                              (option: { cuscde: string; cusdsc: string }) => (
                                <MenuItem
                                  key={option.cuscde}
                                  value={option.cuscde}
                                >
                                  {option.cusdsc}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        )}
                      />
                      <Controller
                        name="salesDetails.shipto"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Ship to is Required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            size="small"
                            label="Ship To"
                            disabled={false}
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                            sx={{
                              width: {
                                xs: 223,
                                sm: 650,
                              },
                            }}
                          >
                            <MenuItem key="" value="" sx={{ color: "gray" }}>
                              (please select option)
                            </MenuItem>
                            {shipto?.map(
                              (option: { id: string; name: string }) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              )
                            )}
                          </TextField>
                        )}
                      />
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box>
                <Accordion
                  expanded={isExpandedAdd}
                  onChange={() => setExpandedAdd(!isExpandedAdd)}
                  variant="outlined"
                  sx={{ border: "none" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      flexDirection: "row-reverse",
                      p: 0,
                      "&.Mui-expanded": {
                        borderTop: "1px solid rgb(231, 231, 231)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      color={
                        hasInvalidAdditionalDetails ? "#d32f2f" : "inherit"
                      }
                    >
                      &nbsp;&nbsp;&nbsp;Additional Details *
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ ml: -2 }}>
                    <Stack
                      spacing={2}
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      useFlexGap
                      flexWrap="wrap"
                      mr={3}
                    >
                      <Controller
                        name="salesDetails.preby"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Prepared by is required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="text"
                            size="small"
                            label="Prepared By"
                            disabled={false}
                            placeholder="Prepared By"
                            fullWidth={false}
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                          />
                        )}
                      />
                      <Controller
                        name="salesDetails.chkby"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Checked by is required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="text"
                            size="small"
                            label="Checked By"
                            disabled={false}
                            placeholder="Checked By"
                            fullWidth={false}
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                          />
                        )}
                      />
                      <Controller
                        name="salesDetails.apvby"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Approved by is required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="text"
                            size="small"
                            label="Approved By"
                            disabled={false}
                            placeholder="Approved By"
                            fullWidth={false}
                            autoFocus={true}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                          />
                        )}
                      />
                      <Controller
                        name="salesDetails.remarks"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "Remarks is required.",
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            type="text"
                            size="small"
                            label="Remarks"
                            disabled={false}
                            placeholder="Remarks"
                            fullWidth={false}
                            autoFocus={true}
                            multiline
                            rows={2}
                            error={!!fieldState.error}
                            helperText={
                              fieldState.error ? fieldState.error.message : ""
                            }
                            sx={{
                              width: {
                                sm: 946,
                                xs: 223,
                              },
                            }}
                          />
                        )}
                      />
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            pt={{
              xs: 2,
              sm: 0,
            }}
            alignContent="center"
            textAlign={{
              xs: "left",
              sm: "right",
            }}
            borderTop={{
              xs: "1px solid #ccc",
              sm: "none",
            }}
            borderLeft={{
              xs: "none",
              sm: "1px solid #ccc",
            }}
          >
            <Box>
              <Typography variant="h5">Grand Total</Typography>
              <Typography variant="h5" fontWeight={550}>
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(
                  parseFloat(String(watch("salesDetails.totamtdisfor") || 0))
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mr: 3, mt: 2 }} />
      </LocalizationProvider>
    </>
  );
};

export default SalesDetails;
