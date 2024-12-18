import * as React from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { ItemListFirst, ItemListSecond } from "./ItemList";
import { useEventHandles } from "@/_shared/components/Sidebar/EventHandler";
import { useToggleHandles } from "@/_shared/components/Sidebar/EventHandler";
import Backdrop from "@mui/material/Backdrop";
import { useAuthStore } from "@/_shared/store/AuthStore";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { useMinimizeDrawer } from "@/_shared/store/SidebarStore";
import { CtrlSlider, Drawer1, Drawer2 } from "./Styles";
import { SidebarProps } from "./types";
import { Typography } from "@mui/material";

const defaultTheme = createTheme();

export default function Sidebar({ children }: SidebarProps) {
  const { user } = useAuthStore();
  const { open2, setOpen2, toggleDrawer2, open3, setOpen3, toggleDrawer3 } =
    useToggleHandles();
  const { items2, setItems2, items3, setItems3 } = useEventHandles();
  const { isMinimized, setMinimized } = useMinimizeDrawer();

  const drawerSlider = () => {
    setMinimized(!isMinimized);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <CssBaseline />

        {/* Drawer 1 */}
        <div style={{ position: "relative" }}>
          <Drawer1
            variant="permanent"
            onClick={toggleDrawer3(false)}
            open2={open2}
            isMinimized={isMinimized}
          >
            <Toolbar
              sx={{
                m: 3,
                mt: 5,
                border: "2px solid #ccc",
                borderRadius: 3,
                justifyContent: "center",
                display: isMinimized ? "none" : "content",
              }}
            >
              <Typography align="center" fontFamily="Poppins">
                LSTV BUILDING BLOCKS React Template
              </Typography>
            </Toolbar>
            <List component="nav">
              <ItemListFirst
                open={open2}
                setItems={setItems2}
                setOpen={setOpen2}
                isMinimized={isMinimized}
              />
            </List>
          </Drawer1>
          <CtrlSlider
            size="small"
            aria-label="toggle drawer"
            color="success"
            open2={open2}
            onClick={drawerSlider}
            isMinimized={isMinimized}
          >
            {isMinimized ? (
              <ArrowRight fontSize="inherit" />
            ) : (
              <ArrowLeft fontSize="inherit" />
            )}
          </CtrlSlider>
        </div>
        <Backdrop
          sx={{ zIndex: 2 }}
          onClick={() => setOpen2(false)}
          open={open2}
        />

        {/* Drawer 2 */}
        <Drawer2
          variant="persistent"
          open={open2}
          onClose={toggleDrawer2(false)}
          isMinimized={isMinimized}
        >
          <List component="nav">
            <ItemListSecond
              items={items2}
              open={open3}
              setItems={setItems3}
              setOpen={setOpen3}
            />
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
