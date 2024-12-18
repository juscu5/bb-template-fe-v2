import React from "react";
import { Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAuthStore } from "@/_shared/store/AuthStore";
import { useLogout } from "@/_shared/store/GlobalFuncStore";
import { GlobalDialog } from "../../Dialog/GlobalDialog";
import AppsIcon from "@mui/icons-material/Apps";
import Settings from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./Styles";

export default function AppBar() {
  const { user } = useAuthStore();
  const { logMeOut } = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleLogout = () => {
    navigate("");
    logMeOut();
  };

  const buttonText = [
    {
      text: "Yes",
      color: "error",
      onClick: () => handleLogout(),
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
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            Lee Systems Ventures Inc
          </Typography>
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
