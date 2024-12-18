import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import {
  Box,
  Divider,
  ListItemButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useFetchMenuItems } from "../MenuItem";
import { useEventHandles } from "@/_shared/components/Sidebar/EventHandler";
import { useNavigate } from "react-router-dom";
import { StyledListItemIcon } from "./Styles";
import { ItemListFirstProps, ItemListSecondProps } from "./types";
import { ExpandMore } from "@mui/icons-material";

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
  open,
  setItems,
  setOpen,
  isMinimized,
}: ItemListFirstProps<T>) {
  const { isError, isLoading, error, data } = useFetchMenuItems();
  const navigate = useNavigate();
  const { handleMouseLeave } = func();

  const [openId, setOpenId] = React.useState<number | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const onOpen = (items: any, id: number) => {
    setItems(items);

    if (openId === id) {
      setOpenId(null);
      setOpen(false);
    } else {
      setOpenId(id);
      setOpen(true);
    }
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "hidden", marginLeft: 12, marginRight: 12 }}
    >
      {data &&
        data.map((side: any, idx: number) => {
          const icon = (
            <StyledListItemIcon
              aria-labelledby="test"
              sx={{ mr: 2.5, justifyContent: "center" }}
              children={side.icon}
            />
          );

          return (
            <Box key={idx} sx={{ cursor: "pointer" }}>
              <ListItemButton
                dense
                sx={{
                  width: "100%",
                  mt: 0.5,
                  mb: 0.5,

                  bgcolor:
                    openId === idx && open
                      ? "rgba(0, 0, 0, 0.1)"
                      : "Background.default",
                }}
                onClick={
                  side && side.items
                    ? () => onOpen(side.items, idx)
                    : side.menprg
                    ? () => navigate(side.menprg)
                    : () => setOpen(false)
                }
              >
                {isMinimized ? (
                  <Tooltip
                    title={side.label}
                    placement="right"
                    children={icon}
                  />
                ) : (
                  icon
                )}

                {!isMinimized && (
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        fontFamily="Poppins"
                        sx={{
                          whiteSpace: "normal",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          transition: "all 0.3s ease",
                          opacity: 1,
                          wordWrap: "break-word",
                        }}
                      >
                        {side.label}
                      </Typography>
                    }
                  />
                )}
                {!isMinimized && side.items && (
                  <>
                    {openId === idx && open ? (
                      <ArrowLeft fontSize="small" />
                    ) : (
                      <ArrowRight fontSize="small" />
                    )}
                  </>
                )}
              </ListItemButton>
            </Box>
          );
        })}
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
  let lastHeader: string | null = null;

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
              dense
              sx={{
                width: "100%",
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
              {/* <ListItemIcon sx={{ marginLeft: "5px" }}>
                {side.icon}
              </ListItemIcon> */}
              <ListItemText
                // sx={{ marginLeft: "-15px" }}
                primary={
                  <Typography
                    variant="subtitle2"
                    fontFamily="Poppins"
                    sx={{
                      whiteSpace: "normal",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      wordWrap: "break-word",
                    }}
                  >
                    {side.label}
                  </Typography>
                }
              />
              {side.items ? (
                <>{open === side.label ? <ExpandMore /> : <ArrowRight />}</>
              ) : (
                ""
              )}
            </ListItemButton>

            <Collapse in={open === side.label} timeout="auto">
              <List component="div" disablePadding>
                {side.items?.map((subItem: any) => {
                  const shouldRenderHeader = subItem.menheader !== lastHeader;
                  lastHeader = subItem.menheader;

                  const header = shouldRenderHeader ? subItem.menheader : null;

                  return (
                    <>
                      {header && (
                        <ListItem
                          dense
                          sx={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            mb: -1.5,
                            ml: 1,
                            mr: 1,
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                variant="caption"
                                sx={{
                                  whiteSpace: "none",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  fontWeight: "600",
                                }}
                              >
                                {header}
                              </Typography>
                            }
                          />
                        </ListItem>
                      )}
                      <ListItemButton
                        dense
                        sx={{
                          bgcolor: "background.paper",
                          justifyContent: "center",
                          pt: 0,
                          pb: 0,
                          ml: subItem.menheader ? 2 : 1,
                          mr: subItem.menheader ? 2 : 1,
                        }}
                        onClick={() => handleClick(subItem.label)}
                      >
                        {/* <ListItemIcon>{subItem.icon}</ListItemIcon> */}
                        <ListItemText
                          primary={
                            <Typography
                              fontFamily="Poppins"
                              variant="caption"
                              color="#787878"
                              sx={{
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
                    </>
                  );
                })}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
    </List>
  );
}
