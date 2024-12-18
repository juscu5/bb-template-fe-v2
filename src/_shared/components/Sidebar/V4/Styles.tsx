import ListItemIcon from "@mui/material/ListItemIcon";
import { styled, Theme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { IconButton, ListItem } from "@mui/material";
import { DrawerProps } from "./types";

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "auto",
  paddingRight: theme.spacing(1),
}));

export const scrollBarStyle = (theme: Theme) => ({
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#F0F0F0",
    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: "10px",
  },
});

export const CtrlSlider = styled(IconButton)<DrawerProps>(
  ({ theme, open2, isMinimized }) => ({
    position: "fixed",
    top: 85,
    left: isMinimized ? 68 : 268,
    transform: "translateY(-50%)",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    zIndex: theme.zIndex.drawer + 3,
    width: 22,
    height: 22,
    transition: "left 0.3s ease, opacity 0.3s ease",
    display: open2 ? "none" : "content",
    "& .MuiIconButton-label": {
      fontSize: 20,
    },
  })
);

export const Drawer1 = styled(MuiDrawer)<DrawerProps>(
  ({ theme, open2, isMinimized }) => ({
    "& .MuiDrawer-paper": {
      zIndex: theme.zIndex.drawer + 3,
      position: "fixed",
      overflowX: "hidden",
      marginTop: theme.spacing(7),
      height: `calc(100% - ${theme.spacing(7)})`,
      backgroundColor: open2 ? "#FFFFFF" : "rgb(244, 245, 247)",
      width: isMinimized ? theme.spacing(10) : theme.spacing(35),
      clipPath: isMinimized ? "inset(0 0 0 0)" : "none", // Adjust clipping as needed
      transition: "width 0.3s ease",
      flexDirection: "column",
      boxShadow: open2
        ? "none"
        : "rgba(0, 0, 1, 0.15) -0.5px 0px 6px 0px inset",
      ...scrollBarStyle(theme),
    },
  })
);

export const Drawer2 = styled(MuiDrawer)<DrawerProps>(
  ({ theme, isMinimized }) => ({
    zIndex: theme.zIndex.drawer + 2,
    "& .MuiDrawer-paper": {
      ...{
        position: "fixed",
        whiteSpace: "nowrap",
        overflowX: "hidden",
        width: theme.spacing(35),
        marginTop: theme.spacing(7),
        height: `calc(100% - ${theme.spacing(7)})`,
        marginLeft: isMinimized ? theme.spacing(10) : theme.spacing(35),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        ...scrollBarStyle(theme),
      },
    },
  })
);