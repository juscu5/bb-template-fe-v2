import React from "react";
import { Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAuthStore } from "@/_shared/store/AuthStore";
import { useLogout } from "@/_shared/store/GlobalFuncStore";
import AppsIcon from "@mui/icons-material/Apps";
import Settings from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import lstIcon from "@assets/lst.png";
import { GlobalDialog } from "../../Dialog/GlobalDialog";
import { NavBar, Search, SearchIconWrapper, StyledInputBase } from "./Styles";

export default function AppBar() {
  const { user } = useAuthStore();
  const { logMeOut } = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const buttonText = [
    {
      text: "Yes",
      color: "error",
      onClick: logMeOut,
    },
  ];

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography sx={{ padding: 1 }}>&ensp;{user?.usrname}</Typography>
      <MenuItem onClick={handleOpenDialog}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <>
      <NavBar position="fixed">
        <Toolbar>
          <img
            src={lstIcon}
            alt="LSTV No 1"
            style={{
              width: "25px",
              height: "25px",
              marginRight: 15,
            }}
          />
          <Typography
            component="h1"
            variant="button"
            fontSize="20px"
            color="inherit"
            fontWeight={550}
            noWrap
            sx={{ flexGrow: 1, cursor: "pointer", color: "#042500" }}
          >
            Lee System Technology Ventures
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Item"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <MenuItem sx={{ height: 56, pl: 1, pr: 1, ml: 1 }}>
            <Settings />
          </MenuItem>
          <MenuItem sx={{ height: 56, pl: 1, pr: 1 }}>
            <AppsIcon />
          </MenuItem>
          <MenuItem
            onClick={handleProfileMenuOpen}
            sx={{ height: 56, pl: 1, pr: 1 }}
          >
            <AccountCircle />
            &nbsp;
            <p> {user?.usrname}</p>
          </MenuItem>
        </Toolbar>
      </NavBar>
      {renderMenu}
      <GlobalDialog
        isDialogOpen={dialogOpen!}
        setDialogOpen={setDialogOpen}
        title="Log Out"
        context="Do you want to logout?"
        buttonText={buttonText}
      />
    </>
  );
}
