import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FieldValues,
  Path,
  UseFormReturn,
  Controller,
  PathValue,
} from "react-hook-form";
import { FormElement } from "./types/FormElement";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Android12Switch, AntSwitch, IOSSwitch } from "./Style/ToggleStyle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  formElements: FormElement[];
  isLoading: boolean;
  submitButtonText?: string;
  isSubmitButtonEnable?: boolean;
}

export default function Form<T extends FieldValues>({
  form,
  onSubmit,
  formElements,
  isLoading,
  submitButtonText = "Submit",
  isSubmitButtonEnable,
}: FormProps<T>) {
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  // dyanamic grid up to 3 column
  const formElementLength = formElements.length;
  const formElementsCol = Array.from(
    { length: formElementLength },
    (column: any, formIdx: number) =>
      formElements.slice(formIdx * 8, formIdx * 8 + 8)
  );

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <Grid container>
        {formElementsCol.map((column, colIndex) => (
          <Grid
            item
            xs={12}
            md={formElementLength <= 5 ? 12 : 3}
            key={colIndex}
          >
            <Stack spacing={2} width={formElementLength <= 5 ? "100%" : "90%"}>
              {column.map((element, index) => (
                <React.Fragment key={index}>
                  {element.type === "text" && (
                    <Controller
                      name={element.name as Path<T>}
                      control={control}
                      rules={{ required: element.errorRequiredText }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field} // Spread react-hook-form field props
                          type="text"
                          size="small"
                          id={element.name}
                          label={element.label}
                          placeholder={element.placeholder}
                          fullWidth={!!element.fullWidth}
                          multiline={!!element.multiline}
                          rows={element.multiline ? 3 : 0}
                          required={!!element.required}
                          disabled={!!element.disabled}
                          autoFocus={!!element.autoFocus}
                          error={!!error} // Display error if it exists
                          helperText={error ? String(error.message) : ""}
                          InputProps={{
                            readOnly: !!element.readOnly, // Conditionally set readOnly prop
                          }}
                        />
                      )}
                    />
                  )}
                  {element.type === "password" && (
                    <TextField
                      type={showPassword ? "text" : "password"}
                      size="small"
                      id={element.name}
                      label={element.label}
                      placeholder={element.placeholder}
                      fullWidth={element.fullWidth}
                      required={element.required}
                      disabled={element.disabled}
                      autoFocus={element.autoFocus}
                      error={!!errors[element.name]}
                      helperText={
                        errors[element.name]
                          ? String(errors[element.name]?.message)
                          : ""
                      }
                      {...register(element.name as Path<T>, {
                        required: element.errorRequiredText,
                      })}
                      autoComplete="current-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  {element.type === "number" && (
                    <TextField
                      type="number"
                      size="small"
                      id={element.name}
                      label={element.label}
                      placeholder={element.placeholder}
                      fullWidth={element.fullWidth}
                      required={element.required}
                      disabled={element.disabled}
                      autoFocus={element.autoFocus}
                      error={!!errors[element.name]}
                      helperText={
                        errors[element.name]
                          ? String(errors[element.name]?.message)
                          : ""
                      }
                      {...register(element.name as Path<T>, {
                        required: element.errorRequiredText,
                      })}
                      InputProps={{
                        readOnly: element.readOnly ? true : false,
                        inputProps: {
                          pattern: "^[0-9]*.?[0-9]{0,2}$",
                        },
                      }}
                    />
                  )}
                  {element.type === "select" && (
                    <Controller
                      name={element.name as Path<T>}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          select
                          size="small"
                          id={element.name}
                          label={element.label}
                          placeholder={element.placeholder}
                          fullWidth={element.fullWidth}
                          required={element.required}
                          disabled={element.disabled}
                          autoFocus={element.autoFocus}
                          error={!!errors[element.name]}
                          helperText={
                            errors[element.name]
                              ? String(errors[element.name]?.message)
                              : ""
                          }
                          inputProps={{
                            ...register(element.name as Path<T>, {
                              required: element.errorRequiredText,
                            }),
                          }}
                          InputProps={{
                            readOnly: element.readOnly,
                          }}
                        >
                          <MenuItem key="" value="" sx={{ color: "gray" }}>
                            (please select option)
                          </MenuItem>
                          {element.selectOpt?.map(
                            (option: { id: string; name: string }) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                      )}
                    />
                  )}
                  {element.type === "date" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name={element.name as Path<T>}
                        control={control}
                        rules={{
                          required: element.errorRequiredText,
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
                            label={element.label}
                            disabled={element.disabled}
                            autoFocus={element.autoFocus}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => {
                              const formattedDate = date
                                ? dayjs(date).format("MM/DD/YYYY").toString()
                                : null;
                              field.onChange(formattedDate);
                            }}
                            readOnly={element.readOnly}
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
                  )}
                  {element.type === "toggle" && (
                    <Controller
                      name={element.name as Path<T>}
                      control={control}
                      defaultValue={false as PathValue<T, Path<T>>}
                      render={({ field }) => (
                        <FormControlLabel
                          id={element.name}
                          label={element.label}
                          autoFocus={element.autoFocus}
                          disabled={element.readOnly}
                          sx={
                            element.toggleStyle === "ios"
                              ? {
                                  marginTop: 1,
                                  marginBottom: 1,
                                  marginLeft: -0.2,
                                }
                              : undefined
                          }
                          control={
                            element.toggleStyle === "android" ? (
                              <Android12Switch
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                              />
                            ) : element.toggleStyle === "ios" ? (
                              <IOSSwitch
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                              />
                            ) : element.toggleStyle === "ant" ? (
                              <AntSwitch
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                              />
                            ) : element.toggleStyle === "switch" ? (
                              <Switch
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                              />
                            ) : (
                              <Checkbox
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                              />
                            )
                          }
                        />
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Button
        size="small"
        type="submit"
        fullWidth={formElements[0].fullWidth}
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          display:
            isSubmitButtonEnable || isSubmitButtonEnable === undefined
              ? "inherit"
              : "none",
        }}
        disabled={isLoading}
      >
        {submitButtonText}
      </Button>
    </Box>
  );
}
