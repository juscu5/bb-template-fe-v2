import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

export const SalesLoadingSkeleton = () => {
  return (
    <Box ml={3} mt={-1} pt={1} mr={3}>
      <Grid container>
        <Grid item md={9}>
          <Skeleton width={200} height={70} sx={{ mb: -4 }} />
          <Skeleton width="100%" height={150} sx={{ mb: -6 }} />
          <Skeleton width="100%" height={150} sx={{ mb: -6 }} />
          <Skeleton width="100%" height={150} />
        </Grid>
        <Grid item md={3} alignContent="center">
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Skeleton width="70%" height={70} sx={{ mb: -3 }} />
            <Skeleton width="20%" height={70} sx={{ mb: -1 }} />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Skeleton width={300} height={70} sx={{ mb: -3 }} />
          <Skeleton width={300} height={70} sx={{ mb: -5 }} />
          <Skeleton width="100%" height={150} sx={{ mb: -5 }} />
        </Grid>
      </Grid>
    </Box>
  );
};
