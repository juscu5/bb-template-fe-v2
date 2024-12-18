import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { Box, Divider, ListItemButton, Typography } from "@mui/material";
import { useFetchMenuItems } from "../MenuItem";
import { useEventHandles } from "@/_shared/components/Sidebar/EventHandler";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Nested, StyledListItemIcon } from "./Styles";
import { ItemListFirstProps, ItemListSecondProps } from "./types";

const func = () => {
  const { handleClick, handleMouseLeave, handleClickSecondLevel, setItems2 } =
    useEventHandles();
  return {
    handleClick,
    handleMouseLeave,
    handleClickSecondLevel,
    setItems2,
  };
};

export function ItemListFirst<T extends any[]>({
  setItems,
  setOpen,
}: ItemListFirstProps<T>) {
  const { isError, isFetched, isLoading, error, account, data } =
    useFetchMenuItems();
  const navigate = useNavigate();
  const { handleMouseLeave } = func();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const onOpen = (items: any) => {
    setItems(items);
    setOpen(true);
  };

  const lockClose = () => {
    setOpen(false);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        justifyContent: "center",
      }}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "hidden" }}
    >
      {data &&
        data.map((side: any) => (
          <Box key={side.id} sx={{ cursor: "pointer" }}>
            <ListItemButton
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                justifyContent: "center",
                height: "80px",
              }}
              onClick={
                side && side.items
                  ? () => onOpen(side.items)
                  : side.menprg
                  ? () => navigate(side.menprg)
                  : () => lockClose()
              }
            >
              <StyledListItemIcon>
                {side.icon}
                <Typography variant="body2">{side.label}</Typography>
              </StyledListItemIcon>
            </ListItemButton>
            <Divider />
          </Box>
        ))}
    </List>
  );
}

export function ItemListSecond<T extends any[]>({
  items,
}: ItemListSecondProps<T>) {
  const { isError, isFetched, isLoading, error, account, data } =
    useFetchMenuItems();
  const navigate = useNavigate();
  const { handleClick, open } = useEventHandles();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {items &&
        items.map((side: any) => (
          <React.Fragment key={side.id}>
            <ListItemButton
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                justifyContent: "center",
              }}
              onClick={
                side.items
                  ? () => handleClick(side.label)
                  : () => {
                      navigate(side.menprg);
                    }
              }
            >
              <ListItemIcon sx={{ marginLeft: "20px" }}>
                {side.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ marginRight: "20px" }}
                primary={
                  <Typography
                    sx={{
                      whiteSpace: "normal",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      wordWrap: "break-word",
                      //fontWeight: "600",
                    }}
                  >
                    {side.label}
                  </Typography>
                }
              />
              {side.items ? (
                <>{open === side.label ? <ArrowLeft /> : <ArrowRight />}</>
              ) : (
                ""
              )}
            </ListItemButton>

            <Collapse in={open === side.label} timeout="auto">
              <Nested>
                <List component="div" disablePadding>
                  {side.items?.map((subItem: any) => (
                    <ListItemButton
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        justifyContent: "center",
                      }}
                      onClick={() => handleClick(subItem.label)}
                    >
                      {/* <ListItemIcon>{subItem.icon}</ListItemIcon> */}
                      <ListItemIcon></ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle2"
                            color="#787878"
                            sx={{
                              // fontWeight: "600",
                              whiteSpace: "normal",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              wordWrap: "break-word",
                            }}
                          >
                            {subItem.label}
                          </Typography>
                        }
                        onClick={() => {
                          navigate(subItem.menprg);
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Nested>
            </Collapse>
          </React.Fragment>
        ))}
    </List>
  );
}
