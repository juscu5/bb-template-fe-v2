import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

export const NavBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 4,
  backgroundColor: "#597445",
}));
