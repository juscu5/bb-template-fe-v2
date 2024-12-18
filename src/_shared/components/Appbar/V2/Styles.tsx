import { InputBase } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { alpha, styled } from "@mui/material/styles";

export const NavBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 4,
  backgroundImage: "linear-gradient(to left, #98BFA2, #ffffff)",
  color: "inherit",
  height: theme.spacing(7),
  boxShadow: "none",
  borderBottom: "1px solid #ccc",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  "& .MuiToolbar-root": {
    minHeight: theme.spacing(7),
  },
  "& .MuiButtonBase-root": {
    minHeight: theme.spacing(2),
  },
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  height: "50%",
  border: "1px solid #3C3D37",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  height: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    fontSize: 15,
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
