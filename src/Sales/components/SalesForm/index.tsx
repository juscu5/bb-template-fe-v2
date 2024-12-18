import { SalesFormProps } from "@/Sales/types";
import React from "react";
import ItemDetails from "./ItemDetail";
import SalesDetails from "./SalesDetails";
import { Box, Tab, Tabs } from "@mui/material";
import ItemOtherInfo from "./ItemOtherInfo";

const SalesForm = ({
  isDocnumChecked,
  docNum,
  customer,
  user,
  primaryId,
  isAddPageEnable,
  isEditPageEnable,
  isViewPageEnable,
  salesItemData,
  isSuccess,
}: SalesFormProps) => {
  const [val, setVal] = React.useState(0);
  const [isItemTabVisible, setItemTabVisible] = React.useState<boolean>(true);
  const [isAddTabVisible, setAddTabVisible] = React.useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setVal(newValue);
  };
  const handleItemVisible = () => {
    setItemTabVisible(true);
    setAddTabVisible(false);
  };
  const handleAddVisible = () => {
    setAddTabVisible(true);
    setItemTabVisible(false);
  };

  return (
    <>
      <SalesDetails
        isDocnumChecked={isDocnumChecked}
        customer={customer}
        isViewPageEnable={isViewPageEnable}
      />
      <Box mt={3} mb={3}>
        <Tabs
          value={val}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
        >
          <Tab label="Item Detail" onClick={handleItemVisible} />
          <Tab label="Other Info" onClick={handleAddVisible} />
        </Tabs>
      </Box>
      <Box
        sx={{
          pointerEvents: isViewPageEnable ? "none" : "auto",
          opacity: isViewPageEnable ? 0.7 : 1,
        }}
      >
        <Box display={isItemTabVisible ? "inherit" : "none"}>
          <ItemDetails
            primaryId={primaryId}
            isAddPageEnable={isAddPageEnable}
            isEditPageEnable={isEditPageEnable}
            isViewPageEnable={isViewPageEnable}
            salesItemData={salesItemData}
            isSuccess={isSuccess}
          />
        </Box>
        <Box display={isAddTabVisible ? "inherit" : "none"}>
          <ItemOtherInfo />
        </Box>
      </Box>
      <br />
    </>
  );
};

export default SalesForm;
