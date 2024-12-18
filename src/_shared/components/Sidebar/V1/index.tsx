import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { ItemList } from "./ItemList";
import { SidebarProps } from "./types";
import { Drawer } from "./Styles";

const defaultTheme = createTheme();

export default function Sidebar({ children }: SidebarProps) {
  const [open, setOpen] = React.useState(true);

  const handleMouseEnter = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          ></Toolbar>
          <Divider />
          <List
            component="nav"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ItemList />

            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
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
