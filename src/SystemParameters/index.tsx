import PageHeader from "@/_shared/components/PageHeader";
import { Box, Grid } from "@mui/material";
import TabsComponent from "@/_shared/components/Tabs";
import { TabsConfiguration } from "./config";

const SystemParameters = () => {
  const { TabsListContent } = TabsConfiguration();

  return (
    <Box>
      <Grid container columns={12}>
        <Grid item xs={12} md={12} ml={2} mr={2}>
          <PageHeader title="System Parameters" />
        </Grid>
        <Grid item xs={12} md={12} ml={4} mr={4}>
          <TabsComponent tabsListContent={TabsListContent} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemParameters;
