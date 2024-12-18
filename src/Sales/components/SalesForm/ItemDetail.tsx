import React, { useContext, useState } from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Pagination,
  Paper,
  IconButton,
  Typography,
  Box,
  Stack,
  MenuItem,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  InputAdornment,
  Slide,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ItemDetailsProps, SalesField } from "@/Sales/types";
import { debounce } from "lodash";
import { GlobalContext } from "@/_shared/context/GlobalContext";
import { useGlobalDialogCtrl } from "@/_shared/hooks/GlobalDialogCtrl";
import { GlobalDialog } from "@/_shared/components/Dialog/GlobalDialog";
import { TableConfiguration } from "@/Items/config";
import { TableConfiguration as SearchItemConfiguration } from "@/Sales/config";
import { getItemsQuery } from "@/Items/api";
import { useAccountStore } from "@/_shared/store/AccountStore";
import { Table } from "@/_shared/components/Table";

export default function ItemDetail({
  isAddPageEnable,
  isEditPageEnable,
  isViewPageEnable,
  salesItemData,
  isSuccess,
}: ItemDetailsProps) {
  const { useSnackBar } = useContext(GlobalContext);
  const { account } = useAccountStore();
  const salesItemFromDb = salesItemData?.data?.payload;

  // #region react-hook-form
  const { control, watch, setValue, trigger, getFieldState } =
    useFormContext<SalesField>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "salesItem",
  });
  const salesItems = watch("salesItem") || [];
  const salesItemIni = {
    dettype: "",
    itmcde: "",
    itmdsc: "",
    taxcde: "",
    itmqty: 0.0,
    untmea: "",
    groprc: 0.0,
    discountCode: "",
    discper: 0,
    discamt: 0.0,
    untprc: 0.0,
    extprc: 0.0,
    sonum: "",
    drnum: "",
    barcde: "",
  };
  // #endregion

  // #region Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(fields.length / itemsPerPage);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  // React-hook-form fields connected to Pagination
  const currentFields = fields.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // #endregion

  // #region Item Handles and Animation
  const [visibleItems, setVisibleItems] = useState(fields.map(() => true));
  const handleAddItem = () => {
    const hasEmptyDescription = salesItems.some(
      (item) => item.dettype === "" || item.itmcde === "" || item.itmdsc === ""
    );
    if (hasEmptyDescription) {
      useSnackBar(
        "Please complete the required fields on item before adding new.",
        {
          variant: "error",
        }
      );
      trigger(["salesItem"]);
      return;
    }
    append(salesItemIni);
    setVisibleItems((prev) => [...prev, true]);
  };
  const handleRemoveItem = (actualIndex: number) => {
    setVisibleItems((prev) =>
      prev.map((visible, idx) => (idx === actualIndex ? false : visible))
    );
    setTimeout(() => {
      remove(actualIndex);
      setVisibleItems((prev) => prev.filter((_, idx) => idx !== actualIndex));
    }, 500); // Match the animation duration (500ms)
  };
  // #endregion

  // #region Fields Options Initialization
  const umOptions = ["None", "kg", "pcs", "liters"];
  const vatCodeOptions = [
    "None",
    "SAL VAT",
    "SJ VAT 10.02.21",
    "VAT 0 RATED",
    "VAT EXEMPT",
  ];
  const discountCodeOptions = ["None", "Diplomat", "SC20", "SC5"];
  // #endregion

  // #region State Fields with Calculations with the Grand Total
  React.useEffect(() => {
    if (isAddPageEnable || !isEditPageEnable || !isViewPageEnable) {
      remove();
    }
  }, [isAddPageEnable, !isEditPageEnable, !isViewPageEnable]);
  React.useEffect(() => {
    if ((isSuccess && isEditPageEnable) || (isSuccess && isViewPageEnable)) {
      salesItemFromDb.forEach((item: any) => {
        append({
          ...item,
          itmqty: isNaN(parseFloat(item.itmqty))
            ? 0
            : parseFloat(item.itmqty).toFixed(),
          groprc: isNaN(parseFloat(item.untprc))
            ? 0
            : parseFloat(item.untprc).toFixed(2),
          discper: isNaN(parseFloat(item.discper))
            ? 0
            : parseFloat(item.discper).toFixed(),
          discamt: isNaN(parseFloat(item.discamt))
            ? 0
            : parseFloat(item.discamt).toFixed(2),
        });
      });
      setVisibleItems((prev) => [
        ...prev,
        ...new Array(salesItemFromDb.length).fill(true),
      ]);
    }
  }, [salesItemFromDb, isSuccess, isEditPageEnable, isViewPageEnable]);

  React.useEffect(() => {
    calculatedGrandTotal();
  }, [salesItems, salesItemFromDb, setValue]);

  // Delay the computation of the grand total using lodash's debounce
  // to ensure the sum of 'groprc' is calculated after input changes are complete.
  // Loaded the computed 'groprc'
  const calculatedGrandTotal = () => {
    const debouncedCalculateTotal = debounce(() => {
      const grandTotal = salesItems.reduce((total: number, item: any) => {
        const extprc = item.extprc;
        return total + parseFloat(extprc);
      }, 0);
      setValue("salesDetails.totamtdisfor", grandTotal);
    }, 300);
    debouncedCalculateTotal();
    return () => {
      debouncedCalculateTotal.cancel();
    };
  };

  // Calculating the Total Amount and Net Price
  const calculatedTotalAmount = (
    actualIndex: number,
    itmqty: number,
    groprc: number,
    discper: number,
    discamt: number
  ) => {
    const totalUntprc = groprc - (groprc * discper) / 100 - discamt;
    const totalAmount = itmqty * totalUntprc;
    setValue(`salesItem.${actualIndex}.untprc`, totalUntprc);
    setValue(`salesItem.${actualIndex}.extprc`, totalAmount);
    calculatedGrandTotal();
  };

  // Refractored watch, parametarize the same watch that uses.
  const watchToBeCompute = (actualIndex: number) => {
    const itmqty = watch(`salesItem.${actualIndex}.itmqty`) || 0;
    const groprc = watch(`salesItem.${actualIndex}.groprc`) || 0;
    const discper = watch(`salesItem.${actualIndex}.discper`) || 0;
    const discamt = watch(`salesItem.${actualIndex}.discamt`) || 0;

    return {
      itmqty,
      groprc,
      discper,
      discamt,
    };
  };

  // Handle Quantity Change
  const handleQuantityChange = (actualIndex: number, itmqty: number) => {
    const { groprc, discper, discamt } = watchToBeCompute(actualIndex);
    calculatedTotalAmount(actualIndex, itmqty, groprc, discper, discamt);
  };

  // Handle Selling Price Change
  const handleSellingPriceChange = (actualIndex: number, groprc: number) => {
    const { itmqty, discper, discamt } = watchToBeCompute(actualIndex);
    calculatedTotalAmount(actualIndex, itmqty, groprc, discper, discamt);
  };

  // Handle Discount Percent Change
  const handleDiscountPercentChange = (
    actualIndex: number,
    discper: number
  ) => {
    const { itmqty, groprc, discamt } = watchToBeCompute(actualIndex);
    calculatedTotalAmount(actualIndex, itmqty, groprc, discper, discamt);
  };

  // Handle Discount Amount Change
  const handleDiscountAmountChange = (actualIndex: number, discamt: number) => {
    const { itmqty, groprc, discper } = watchToBeCompute(actualIndex);
    calculatedTotalAmount(actualIndex, itmqty, groprc, discper, discamt);
  };

  // Handle Discount Code Change
  const handleDiscountCodeChange = (
    actualIndex: number,
    discountCode: string
  ) => {
    const { itmqty, groprc, discamt } = watchToBeCompute(actualIndex);
    if (discountCode === "Diplomat") {
      setValue(`salesItem.${actualIndex}.discper`, 10);
      calculatedTotalAmount(actualIndex, itmqty, groprc, 10, discamt);
    } else if (discountCode === "SC20") {
      setValue(`salesItem.${actualIndex}.discper`, 20);
      calculatedTotalAmount(actualIndex, itmqty, groprc, 20, discamt);
    } else if (discountCode === "SC5") {
      setValue(`salesItem.${actualIndex}.discper`, 5);
      calculatedTotalAmount(actualIndex, itmqty, groprc, 5, discamt);
    } else {
      setValue(`salesItem.${actualIndex}.discper`, 0);
      calculatedTotalAmount(actualIndex, itmqty, groprc, 0, discamt);
    }
  };
  // #endregion

  // #region Search Item
  const { isDialogOpen, setDialogOpen, dialogContent, setDialogContent } =
    useGlobalDialogCtrl();
  const { tableHead } = TableConfiguration();
  const { itemSearchTableSettings } = SearchItemConfiguration();
  const { data } = getItemsQuery(account);
  const tableData = data?.data?.payload || [];
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const handleAddSelectedData = () => {
    setSelectedData((prevSelectedData) => {
      prevSelectedData.forEach((item) => {
        append({
          dettype: "",
          itmcde: item.itmcde,
          itmdsc: item.itmdsc,
          taxcde: item.taxcde,
          itmqty: 1,
          untmea: item.untmea,
          groprc: parseFloat(parseFloat(item.untprc).toFixed(2)),
          discountCode: "",
          discper: 0,
          discamt: 0.0,
          untprc: parseFloat(parseFloat(item.untprc).toFixed(2)),
          extprc: parseFloat(parseFloat(item.untprc).toFixed(2)),
          sonum: "",
          drnum: "",
          barcde: item.barcde,
        });
      });
      setVisibleItems((prev) => [
        ...prev,
        ...new Array(prevSelectedData.length).fill(true),
      ]);
      return prevSelectedData;
    });
    setDialogOpen(false);
    calculatedGrandTotal();
  };

  const handleSearchItem = () => {
    setDialogContent({
      dialogSize: "xl",
      dialogTitle: "Select Item to Add",
      dialogContext: searchItemDialogContext(),
      dialogOnClick: [
        {
          text: "Add Selected Item",
          textColor: "success",
          onClick: handleAddSelectedData,
        },
      ],
    });
    setDialogOpen(true);
  };

  const searchItemDialogContext = () => {
    return (
      <>
        <Table
          enableCheckbox={true}
          title="Items"
          tableHead={tableHead}
          tableData={tableData}
          tableSettings={itemSearchTableSettings}
          setSelectedCheckData={setSelectedData}
        />
      </>
    );
  };
  // #endregion

  return (
    <>
      <Grid container spacing={2}>
        {!isViewPageEnable && (
          <Grid item xs={12}>
            <Stack
              spacing={1}
              direction={{
                xs: "column",
                sm: "row",
              }}
              useFlexGap
              flexWrap="wrap"
            >
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleAddItem}
              >
                Add Item
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleSearchItem}
              >
                Search Item
              </Button>
            </Stack>
          </Grid>
        )}

        {totalPages === 0 && (
          <Grid item xs={12}>
            <Box
              border="2px dashed #ccc"
              p={3}
              borderRadius={3}
              mr={3}
              textAlign="center"
            >
              <Typography variant="button" color="#ccc">
                No Item
              </Typography>
            </Box>
          </Grid>
        )}
        <Box
          sx={{
            width: "100%",
            margin: 1.5,
            overflow: "hidden",
          }}
        >
          {currentFields.map((item, index) => {
            const actualIndex = (currentPage - 1) * itemsPerPage + index;
            return (
              <Slide
                key={item.id}
                direction={visibleItems[actualIndex] ? "right" : "left"}
                in={visibleItems[actualIndex]}
                mountOnEnter
                unmountOnExit
                timeout={500}
                style={{ marginTop: 15, marginBottom: 15 }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    m: 0.5,
                    borderRadius: 3,
                    boxShadow:
                      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                  }}
                >
                  <Grid
                    item
                    columns={12}
                    container
                    spacing={1}
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                  >
                    <Grid item xs={0.6}>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => handleRemoveItem(actualIndex)}
                        sx={{
                          "&:hover": {
                            color: "red",
                          },
                        }}
                      >
                        <RemoveCircleIcon fontSize="inherit" />
                      </IconButton>
                    </Grid>

                    <Grid item xs={10.2}>
                      <Stack
                        spacing={2}
                        direction={{
                          xs: "column",
                          sm: "row",
                        }}
                        useFlexGap
                        flexWrap="wrap"
                      >
                        {/* I/C */}
                        <Controller
                          name={`salesItem.${actualIndex}.dettype`}
                          control={control}
                          defaultValue={item.dettype || ""}
                          rules={{
                            required: true,
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              size="small"
                              label="I/C"
                              variant="outlined"
                              error={!!fieldState.error}
                              helperText={
                                fieldState.error ? fieldState.error.message : ""
                              }
                              InputLabelProps={{ sx: { fontSize: 12 } }}
                              sx={{ width: 50 }}
                              inputProps={{
                                sx: {
                                  alignContent: "center",
                                  fontSize: 12,
                                  p: 1,
                                },
                              }}
                              onBlur={async () => {
                                await trigger(
                                  `salesItem.${actualIndex}.dettype`
                                );
                              }}
                            />
                          )}
                        />

                        {/* Item No */}
                        <Controller
                          name={`salesItem.${actualIndex}.itmcde`}
                          control={control}
                          defaultValue={item.itmcde || ""}
                          rules={{
                            required: true,
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              size="small"
                              label="Item No"
                              variant="outlined"
                              error={!!fieldState.error}
                              helperText={
                                fieldState.error ? fieldState.error.message : ""
                              }
                              InputLabelProps={{ sx: { fontSize: 12 } }}
                              inputProps={{
                                sx: {
                                  alignContent: "center",
                                  fontSize: 12,
                                  p: 1,
                                },
                              }}
                              onBlur={async () => {
                                await trigger(
                                  `salesItem.${actualIndex}.itmcde`
                                );
                              }}
                            />
                          )}
                        />

                        {/* Item Description */}
                        <Controller
                          name={`salesItem.${actualIndex}.itmdsc`}
                          control={control}
                          defaultValue={item.itmdsc || ""}
                          rules={{
                            required: true,
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              size="small"
                              label="Item Description"
                              type="text"
                              variant="outlined"
                              error={!!fieldState.error}
                              helperText={
                                fieldState.error ? fieldState.error.message : ""
                              }
                              InputLabelProps={{ sx: { fontSize: 12 } }}
                              sx={{ width: 300 }}
                              inputProps={{
                                sx: {
                                  alignContent: "center",
                                  fontSize: 12,
                                  p: 1,
                                },
                              }}
                              onBlur={async () => {
                                await trigger(
                                  `salesItem.${actualIndex}.itmdsc`
                                );
                              }}
                            />
                          )}
                        />

                        {/* Quantity */}
                        <Controller
                          name={`salesItem.${actualIndex}.itmqty`}
                          control={control}
                          defaultValue={item.itmqty}
                          rules={{
                            required: true,
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              size="small"
                              label="Quantity"
                              type="number"
                              variant="outlined"
                              error={!!fieldState.error}
                              helperText={
                                fieldState.error ? fieldState.error.message : ""
                              }
                              InputLabelProps={{ sx: { fontSize: 12 } }}
                              sx={{ width: 80 }}
                              inputProps={{
                                sx: {
                                  alignContent: "center",
                                  fontSize: 12,
                                  p: 1,
                                },
                              }}
                              onBlur={async () => {
                                await trigger(
                                  `salesItem.${actualIndex}.itmqty`
                                );
                              }}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value === "") {
                                  value = "0";
                                }
                                const itmqty = parseFloat(value);
                                handleQuantityChange(actualIndex, itmqty);
                                field.onChange(e); // Update the form state
                              }}
                            />
                          )}
                        />

                        {/* U/M */}
                        <Controller
                          name={`salesItem.${actualIndex}.untmea`}
                          control={control}
                          defaultValue={item.untmea}
                          rules={{
                            required: true,
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              size="small"
                              label="U/M"
                              select
                              variant="outlined"
                              error={!!fieldState.error}
                              helperText={
                                fieldState.error ? fieldState.error.message : ""
                              }
                              InputLabelProps={{ sx: { fontSize: 12 } }}
                              sx={{ width: 80 }}
                              inputProps={{
                                sx: {
                                  alignContent: "center",
                                  fontSize: 12,
                                  p: 0.6,
                                  pl: 1,
                                },
                              }}
                              onBlur={async () => {
                                await trigger(
                                  `salesItem.${actualIndex}.untmea`
                                );
                              }}
                            >
                              {umOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />

                        {/* Selling Price */}
                        <Controller
                          name={`salesItem.${actualIndex}.groprc`}
                          control={control}
                          defaultValue={item.groprc}
                          rules={{
                            required: true,
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              size="small"
                              label="Selling Price"
                              type="text"
                              variant="outlined"
                              error={!!fieldState.error}
                              helperText={
                                fieldState.error ? fieldState.error.message : ""
                              }
                              InputLabelProps={{ sx: { fontSize: 12 } }}
                              inputProps={{
                                sx: {
                                  alignContent: "center",
                                  fontSize: 12,
                                  p: 1,
                                  textAlign: "right",
                                },
                                inputMode: "numeric",
                                pattern: "^[0-9]*.?[0-9]{0,5}$",
                                onKeyPress: (e) => {
                                  if (
                                    !/[0-9.]/.test(e.key) &&
                                    e.key !== "Backspace"
                                  ) {
                                    e.preventDefault();
                                  }
                                },
                              }}
                              onBlur={async () => {
                                await trigger(
                                  `salesItem.${actualIndex}.groprc`
                                );
                              }}
                              onChange={(e) => {
                                let value = e.target.value;
                                if (value === "") {
                                  value = "0";
                                }
                                const groprc = parseFloat(value);
                                handleSellingPriceChange(actualIndex, groprc);
                                field.onChange(e); // Update the form state
                              }}
                            />
                          )}
                        />
                      </Stack>
                      <Box>
                        <Accordion
                          variant="outlined"
                          sx={{ border: "none", mt: 1 }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                              flexDirection: "row-reverse",
                              ml: -2.4,
                              "&.Mui-expanded": {
                                border: "none",
                              },
                            }}
                          >
                            <Typography variant="subtitle1">
                              &nbsp;&nbsp;&nbsp;Additional Details
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ ml: -2, mt: -2 }}>
                            <Stack
                              spacing={2}
                              direction={{
                                xs: "column",
                                sm: "row",
                              }}
                              useFlexGap
                              flexWrap="wrap"
                              mb={1}
                            >
                              {/* Vat Code */}
                              <Controller
                                name={`salesItem.${actualIndex}.taxcde`}
                                control={control}
                                defaultValue={item.taxcde}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    size="small"
                                    label="Vat Code"
                                    select
                                    variant="outlined"
                                    InputLabelProps={{ sx: { fontSize: 12 } }}
                                    sx={{ width: 150 }}
                                    inputProps={{
                                      sx: {
                                        alignContent: "center",
                                        fontSize: 12,
                                        p: 0.6,
                                        pl: 1,
                                      },
                                    }}
                                  >
                                    {vatCodeOptions.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                )}
                              />

                              {/* Discount Code */}
                              <Controller
                                name={`salesItem.${actualIndex}.discountCode`}
                                control={control}
                                defaultValue={item.discountCode}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    size="small"
                                    label="Discount Code"
                                    select
                                    variant="outlined"
                                    InputLabelProps={{ sx: { fontSize: 12 } }}
                                    sx={{ width: 140 }}
                                    inputProps={{
                                      sx: {
                                        alignContent: "center",
                                        fontSize: 12,
                                        p: 0.6,
                                        pl: 1,
                                      },
                                    }}
                                    onChange={(e) => {
                                      const discountCode = e.target.value;
                                      handleDiscountCodeChange(
                                        actualIndex,
                                        discountCode
                                      );
                                      field.onChange(e); // Update the form state
                                    }}
                                  >
                                    {discountCodeOptions.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                )}
                              />

                              {/* Discount Percent */}
                              <Controller
                                name={`salesItem.${actualIndex}.discper`}
                                control={control}
                                defaultValue={item.discper || 0}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    size="small"
                                    label="Discount Percent"
                                    type="text"
                                    variant="outlined"
                                    sx={{ width: 140 }}
                                    InputLabelProps={{ sx: { fontSize: 12 } }}
                                    inputProps={{
                                      sx: {
                                        alignContent: "center",
                                        fontSize: 12,
                                        p: 1,
                                        textAlign: "right",
                                      },
                                      inputMode: "numeric",
                                      pattern: "^[0-9]*.?[0-9]{0,5}$",
                                      onKeyPress: (e) => {
                                        if (
                                          !/[0-9.]/.test(e.key) &&
                                          e.key !== "Backspace"
                                        ) {
                                          e.preventDefault();
                                        }
                                      },
                                    }}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment
                                          sx={{ margin: -0.5 }}
                                          position="end"
                                        >
                                          <Typography variant="subtitle2">
                                            %
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                    }}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      if (value === "") {
                                        value = "0";
                                      }
                                      const discper = parseFloat(value);
                                      handleDiscountPercentChange(
                                        actualIndex,
                                        discper
                                      );
                                      field.onChange(e);
                                    }}
                                  />
                                )}
                              />

                              {/* Discount Amount */}
                              <Controller
                                name={`salesItem.${actualIndex}.discamt`}
                                control={control}
                                defaultValue={item.discamt}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    size="small"
                                    label="Discount Amount"
                                    type="text"
                                    variant="outlined"
                                    sx={{ width: 140 }}
                                    InputLabelProps={{ sx: { fontSize: 12 } }}
                                    inputProps={{
                                      sx: {
                                        alignContent: "center",
                                        fontSize: 12,
                                        p: 1,
                                        textAlign: "right",
                                      },
                                      inputMode: "numeric",
                                      pattern: "^[0-9]*.?[0-9]{0,5}$",
                                      onKeyPress: (e) => {
                                        if (
                                          !/[0-9.]/.test(e.key) &&
                                          e.key !== "Backspace"
                                        ) {
                                          e.preventDefault();
                                        }
                                      },
                                    }}
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      if (value === "") {
                                        value = "0";
                                      }
                                      const discamt = parseFloat(value);
                                      handleDiscountAmountChange(
                                        actualIndex,
                                        discamt
                                      );
                                      field.onChange(e);
                                    }}
                                  />
                                )}
                              />
                            </Stack>
                            <Stack
                              spacing={2}
                              direction={{
                                xs: "column",
                                sm: "row",
                              }}
                              useFlexGap
                              flexWrap="wrap"
                            >
                              {/* D.R. No. */}
                              <Controller
                                name={`salesItem.${actualIndex}.drnum`}
                                control={control}
                                defaultValue={item.drnum}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    size="small"
                                    label="DR No."
                                    variant="outlined"
                                    InputLabelProps={{ sx: { fontSize: 12 } }}
                                    inputProps={{
                                      sx: {
                                        alignContent: "center",
                                        fontSize: 12,
                                        p: 1,
                                      },
                                    }}
                                  />
                                )}
                              />

                              {/* S.O. No. */}
                              <Controller
                                name={`salesItem.${actualIndex}.sonum`}
                                control={control}
                                defaultValue={item.sonum}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    size="small"
                                    label="SO No."
                                    variant="outlined"
                                    disabled
                                    InputLabelProps={{ sx: { fontSize: 12 } }}
                                    inputProps={{
                                      sx: {
                                        alignContent: "center",
                                        fontSize: 12,
                                        p: 1,
                                      },
                                    }}
                                  />
                                )}
                              />

                              {/* IMEI */}
                              <Controller
                                name={`salesItem.${actualIndex}.barcde`}
                                control={control}
                                defaultValue={item.barcde}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    size="small"
                                    label="IMEI"
                                    variant="outlined"
                                    disabled
                                    InputLabelProps={{ sx: { fontSize: 12 } }}
                                    inputProps={{
                                      sx: {
                                        alignContent: "center",
                                        fontSize: 12,
                                        p: 1,
                                      },
                                    }}
                                  />
                                )}
                              />
                            </Stack>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    </Grid>

                    <Grid item xs={1}>
                      {/* Total Amount */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          height: 20,
                          textAlign: {
                            xs: "left",
                            sm: "right",
                          },
                        }}
                      >
                        Total Amount
                      </Typography>
                      <Box
                        sx={{
                          textAlign: {
                            xs: "left",
                            sm: "right",
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textAlign: {
                              xs: "left",
                              sm: "right",
                            },
                          }}
                          fontWeight={550}
                        >
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            parseFloat(
                              String(
                                watch(`salesItem.${actualIndex}.extprc`) || 0
                              )
                            )
                          )}
                        </Typography>
                      </Box>

                      {/* Net Amount */}
                      <Typography
                        variant="subtitle2"
                        sx={{
                          height: 20,
                          textAlign: {
                            xs: "left",
                            sm: "right",
                          },
                        }}
                      >
                        Net Price
                      </Typography>
                      <Box
                        sx={{
                          height: "24px",
                          textAlign: {
                            xs: "left",
                            sm: "right",
                          },
                          fontSize: "16px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            textAlign: {
                              xs: "left",
                              sm: "right",
                            },
                          }}
                          fontWeight={550}
                        >
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(
                            parseFloat(
                              String(
                                watch(`salesItem.${actualIndex}.untprc`) || 0
                              )
                            )
                          )}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Slide>
            );
          })}
        </Box>

        {/* Pagination Component */}
        {totalPages !== 0 && (
          <Grid
            item
            xs={12}
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            textAlign="center"
            position="relative"
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        )}
      </Grid>

      <GlobalDialog
        dialogSize={dialogContent.dialogSize}
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        title={dialogContent.dialogTitle}
        context={dialogContent.dialogContext}
        buttonText={dialogContent.dialogOnClick}
      />
    </>
  );
}
