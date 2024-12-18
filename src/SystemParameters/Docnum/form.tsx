import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DocnumFormProps, DocnumFields } from "./types";

const DocnumForm = ({ onSubmit, formElement, sysParData }: DocnumFormProps) => {
  const { control, handleSubmit, watch, reset } = useForm<DocnumFields>();

  const formIni = () => {
    reset({
      chksaldocnum: sysParData.chksaldocnum,
      saldocnum: sysParData.saldocnum, //Sales
      chksodocnum: sysParData.chksodocnum,
      sodocnum: sysParData.sodocnum, //salesorder
      chksrtdocnum: sysParData.chksrtdocnum,
      srtdocnum: sysParData.srtdocnum, //salesreturn
      chkotdocnum: sysParData.chkotdocnum,
      otdocnum: sysParData.otdocnum, //otherreceivables
      chkpodocnum: sysParData.chkpodocnum,
      podocnum: sysParData.podocnum, //purchaseorder
      chkaprdocnumfor: sysParData.chkaprdocnumfor,
      aprdocnum: sysParData.aprdocnum, //purchasereceiving
      chkarcdocnum: sysParData.chkarcdocnum,
      arcdocnum: sysParData.arcdocnum, //receipts collection (credit memo)
      chkcashdocnum: sysParData.chkcashdocnum,
      cashdocnum: sysParData.cashdocnum, //cashadvances
      chkcusdocnum: sysParData.chkcusdocnum,
      cusdocnum: sysParData.cusdocnum, //customers
      chkinvdocnum: sysParData.chkinvdocnum,
      invdocnum: sysParData.invdocnum, //inventory
      chkgldocnum: sysParData.chkgldocnum,
      gldocnum: sysParData.gldocnum, //transaction gl enrtry
      chkliqdocnum: sysParData.chkliqdocnum,
      liqdocnum: sysParData.liqdocnum, //liquidation
      chkdeptdocnum: sysParData.chkdeptdocnum,
      deptdocnum: sysParData.deptdocnum, //department
      chkitmcde: sysParData.chkitmcde,
      itmcde: sysParData.itmcde, //item
      chkitmclacde: sysParData.chkitmclacde,
      itmclacde: sysParData.itmclacde, //itemclass
    });
  };

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
        {formElement.map((element: any, idx: number) => {
          const checkValue = watch(element.checkFieldName);
          return (
            <Stack direction="row" mr={10}>
              <Controller
                name={element.checkFieldName}
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    id={element.checkFieldName}
                    label=""
                    autoFocus={element.autoFocus}
                    disabled={element.readOnly}
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? 1 : 0)
                        }
                      />
                    }
                  />
                )}
              />
              <Controller
                name={element.textFieldName}
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    size="small"
                    label={element.label}
                    disabled={checkValue === 0 ? true : false}
                    placeholder={element.placeholder}
                    fullWidth={element.fullWidth}
                    autoFocus={element.autoFocus}
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  />
                )}
              />
            </Stack>
          );
        })}
      </Stack>
      <Box mt={5}>
        <Button variant="contained" size="small" type="submit">
          Save Docnum
        </Button>
      </Box>
    </form>
  );
};

export default DocnumForm;
