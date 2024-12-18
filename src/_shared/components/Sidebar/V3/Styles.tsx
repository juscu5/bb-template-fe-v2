import ListItemIcon from "@mui/material/ListItemIcon";
import { styled, Theme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

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
    background: "#F0F0F0", // Track color
    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.grey[400],
    borderRadius: "10px",
  },
});

export const Drawer1 = styled(MuiDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    zIndex: theme.zIndex.drawer + 3,
    position: "fixed",
    overflowX: "hidden",
    width: theme.spacing(12),
    marginTop: theme.spacing(7),
    height: `calc(100% - ${theme.spacing(7)})`,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    ...scrollBarStyle(theme),
  },
}));

export const Drawer2 = styled(MuiDrawer)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 2,
  "& .MuiDrawer-paper": {
    ...{
      position: "fixed",
      whiteSpace: "nowrap",
      overflowX: "hidden",
      width: theme.spacing(31),
      marginTop: theme.spacing(7),
      height: `calc(100% - ${theme.spacing(7)})`,
      marginLeft: theme.spacing(12),
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      ...scrollBarStyle(theme),
    },
  },
}));

export const Drawer3 = styled(MuiDrawer)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  "& .MuiDrawer-paper": {
    position: "fixed",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    marginTop: theme.spacing(7),
    height: `calc(100% - ${theme.spacing(7)})`,
    ...scrollBarStyle(theme),
  },
}));

export const Drawer3_1 = styled(Drawer3)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: theme.spacing(36),
    marginLeft: theme.spacing(43),
    marginTop: theme.spacing(7),
    height: `calc(100% - ${theme.spacing(7)})`,
    ...scrollBarStyle(theme),
  },
}));

export const Drawer3_2 = styled(Drawer3)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: theme.spacing(36),
    marginLeft: theme.spacing(79),
    marginTop: theme.spacing(7),
    height: `calc(100% - ${theme.spacing(7)})`,
    ...scrollBarStyle(theme),
  },
}));

export const Drawer3_3 = styled(Drawer3)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: theme.spacing(36),
    marginLeft: theme.spacing(115),
    marginTop: theme.spacing(7),
    height: `calc(100% - ${theme.spacing(7)})`,
    ...scrollBarStyle(theme),
  },
}));

export const Drawer3_4 = styled(Drawer3)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: theme.spacing(36),
    marginLeft: theme.spacing(151),
    marginTop: theme.spacing(7),
    height: `calc(100% - ${theme.spacing(7)})`,
    ...scrollBarStyle(theme),
  },
}));
