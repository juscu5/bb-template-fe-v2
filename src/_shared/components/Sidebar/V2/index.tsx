import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { ItemListFirst, ItemListSecond } from "./ItemList";
import { useEventHandles } from "@/_shared/components/Sidebar/EventHandler";
import { useToggleHandles } from "@/_shared/components/Sidebar/EventHandler";
import { SidebarProps } from "./types";
import { Drawer1, Drawer2 } from "./Styles";
const defaultTheme = createTheme();

export default function Sidebar({ children }: SidebarProps) {
  const { open2, setOpen2, toggleDrawer2 } = useToggleHandles();
  const { items2, setItems2 } = useEventHandles();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <CssBaseline />
        <Drawer1 variant="permanent" open={open2}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          ></Toolbar>
          <Divider />
          <List component="nav">
            <ItemListFirst setItems={setItems2} setOpen={setOpen2} />
            {/* {DrawerList} */}
          </List>
        </Drawer1>
        <Drawer2 open={open2} onClose={toggleDrawer2(false)}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          />
          <Divider />
          <List component="nav">
            <ItemListSecond items={items2} />
            {/* {DrawerList2} */}
          </List>
        </Drawer2>
        <Box sx={{ height: "100%", width: "100%" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          ></Toolbar>
          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
