import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material/styles";
import { ListItem } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

export const Nested = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(2.5),
  minHeight: 10,
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "auto",
  paddingRight: theme.spacing(1),
}));

export const Drawer1 = styled(MuiDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    zIndex: theme.zIndex.drawer + 3,
    ...{
      position: "fixed",
      whiteSpace: "nowrap",
      overflowX: "hidden",
      width: theme.spacing(13),
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(15),
      },
    },
  },
}));

export const Drawer2 = styled(MuiDrawer)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 2,
  "& .MuiDrawer-paper": {
    ...{
      position: "fixed",
      whiteSpace: "nowrap",
      overflowX: "hidden",
      width: theme.spacing(45),
      marginLeft: theme.spacing(13),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(45),
        marginLeft: theme.spacing(15),
      },
    },
  },
}));
