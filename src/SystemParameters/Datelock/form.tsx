import {
  Box,
  Button,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatelockFields, DatelockFormProps } from "./types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DatelockForm = ({ onSubmit, sysParData }: DatelockFormProps) => {
  const { control, handleSubmit, watch, reset } = useForm<DatelockFields>();

  const formIni = () => {
    reset({
      gldatelock1: sysParData.gldatelock1,
      gldatelock2: sysParData.gldatelock2,
    });
  };
  const gldatelock1 = watch("gldatelock1");
  const gldatelock2 = watch("gldatelock2")

  useEffect(() => {
    formIni();
  }, [sysParData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        direction={{
          xs: "column",
          sm: "row",
        }}
        useFlexGap
        flexWrap="wrap"
      >
        <Stack spacing={2} direction="row" mr={10}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="gldatelock1"
              control={control}
              rules={{
                required: "Date from is Required",
                validate: (value) => {
                  if (
                    value &&
                    !dayjs(dayjs(value), "MM/DD/YYYY", true).isValid()
                  ) {
                    return "Invalid date";
                  } 
                  if (dayjs(dayjs(value)) > dayjs(dayjs(gldatelock2))){
                    return "Should be not ahead on Date to"
                  }
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Date To"
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
                  sx={{ marginTop: "5px", width: "100%" }}
                />
              )}
            />
            <Controller
              name="gldatelock2"
              control={control}
              rules={{
                required: "Date to is Required",
                validate: (value) => {
                  if (
                    value &&
                    !dayjs(dayjs(value), "MM/DD/YYYY", true).isValid()
                  ) {
                    return "Invalid date";
                  }
                  if (dayjs(dayjs(value)) < dayjs(dayjs(gldatelock1))){
                    return "Should be ahead on Date from"
                  }
                  return true;
                },
              }}
              render={({ field, fieldState }) => (
                <DatePicker
                  {...field}
                  label="Date From"
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
                  sx={{ marginTop: "5px", width: "100%" }}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
      </Stack>
      <Box mt={5}>
        <Button variant="contained" size="small" type="submit">
          Save Datelock
        </Button>
      </Box>
    </form>
  );
};

export default DatelockForm;
