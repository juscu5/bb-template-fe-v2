import { Box, Grid, TextField } from "@mui/material";
import React from "react";

const ItemOtherInfo = () => {
  return (
    <div>
      <Grid container spacing={1} ml={1} mr={1}>
        <Grid item xs={6} md={5}>
          <Box component="fieldset" sx={{ padding: 2, borderRadius: 2 }}>
            <legend>VAT</legend>
            <TextField
              size="small"
              sx={{ mb: 1 }}
              fullWidth
              label="VATable"
              name="docNoTo"
            />
            <TextField
              size="small"
              sx={{ mb: 1 }}
              fullWidth
              label="VAT Exempt"
              name="docNoTo"
            />
            <TextField
              size="small"
              sx={{ mb: 1 }}
              fullWidth
              label="VAT Zero Rated"
              name="docNoTo"
            />
            <TextField
              size="small"
              sx={{ mb: 1 }}
              fullWidth
              label="VAT Amount"
              name="docNoTo"
            />
          </Box>
        </Grid>
        <Grid item xs={6} md={5}>
          <Box component="fieldset" sx={{ borderRadius: 2 }}>
            <legend>Other Info</legend>
            <TextField
              size="small"
              fullWidth
              label="Testing Expiration Date"
              name="docNoTo"
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemOtherInfo;
