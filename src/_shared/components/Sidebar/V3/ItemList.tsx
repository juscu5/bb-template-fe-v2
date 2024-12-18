import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { Box, Divider, ListItemButton, Typography } from "@mui/material";
import { useEventHandles } from "@/_shared/components/Sidebar/EventHandler";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useFetchMenuItems } from "../MenuItem";
import {
  ItemListFirstProps,
  ItemListSecondProps,
  ItemListThirdProps,
} from "./types";
import { StyledListItemIcon } from "./Styles";

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
      sx={{
        bgcolor: "background.paper",
        whiteSpace: "wrap",
        justifyContent: "center",
        marginRight: -0.6,
      }}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "hidden" }}
    >
      {data &&
        data.map((side: any, idx: number) => (
          <Box key={idx} sx={{ cursor: "pointer" }}>
            <ListItemButton
              sx={{
                width: "100%",
                bgcolor:
                  openId === idx && open
                    ? "rgba(0, 0, 0, 0.1)"
                    : "Background.default",
                justifyContent: "center",
                height: 80,
              }}
              onClick={
                side && side.items
                  ? () => onOpen(side.items, idx)
                  : side.menprg
                  ? () => navigate(side.menprg)
                  : () => setOpen(false)
              }
            >
              <StyledListItemIcon>
                {side.icon}
                <Typography variant="caption">{side.label}</Typography>
              </StyledListItemIcon>
            </ListItemButton>
            {idx !== data.length - 1 && <Divider />}
          </Box>
        ))}
    </List>
  );
}

export function ItemListSecond<T extends any[]>({
  items,
  open,
  setOpen,
  setItems,
}: ItemListSecondProps<T>) {
  const { isError, isLoading, error } = useFetchMenuItems();
  const navigate = useNavigate();

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
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {items &&
        items.map((side: any, idx: number) => (
          <React.Fragment key={idx}>
            <ListItemButton
              sx={{
                width: "100%",
                bgcolor:
                  openId === idx && open
                    ? "rgba(0, 0, 0, 0.1)"
                    : "Background.default",
                justifyContent: "center",
              }}
              onClick={
                side && side.items
                  ? () => onOpen(side.items, idx)
                  : side.menprg
                  ? () => navigate(side.menprg)
                  : () => setOpen(false)
              }
            >
              <ListItemIcon sx={{ marginLeft: "5px" }}>
                {side.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ marginLeft: "-15px" }}
                primary={
                  <Typography
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
              {side.items && (
                <>{openId === idx && open ? <ArrowLeft /> : <ArrowRight />}</>
              )}
            </ListItemButton>
          </React.Fragment>
        ))}
    </List>
  );
}

export const ItemLayout = <T extends any[]>({
  items,
  id,
  label,
  menprg,
  header,
}: ItemListThirdProps<T>) => {
  const { handleClick } = useEventHandles();
  const navigate = useNavigate();

  return (
    <React.Fragment key={id}>
      {header && (
        <ListItem
          dense
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItemText
            sx={{ marginLeft: "10px" }}
            primary={
              <Typography
                variant="subtitle2"
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
        onClick={
          items
            ? () => handleClick(label!)
            : () => {
                navigate(menprg!);
              }
        }
      >
        <ListItemIcon sx={{ marginLeft: "-40px" }} />
        <ListItemText
          sx={{ marginRight: "20px" }}
          primary={
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordWrap: "break-word",
              }}
            >
              {label}
            </Typography>
          }
        />
      </ListItemButton>
    </React.Fragment>
  );
};

export function ItemList3_1<T extends any[]>({ items }: ItemListThirdProps<T>) {
  let lastHeader: string | null = null;
  let isFirstCol = true;

  const ItemList = items?.map((side: any, index: number) => {
    const shouldRenderHeader = side.menheader !== lastHeader;
    lastHeader = side.menheader;

    const isCol = side.mencol === "1";
    if (isCol) {
      if (isFirstCol) {
        isFirstCol = false;
        return (
          <React.Fragment key={side.id}>
            <ItemLayout
              items={side.items}
              id={side.id}
              label={side.label}
              menprg={side.menprg}
              header={shouldRenderHeader ? side.menheader : null}
            />
          </React.Fragment>
        );
      }
    }

    return (
      (side.mencol === "1" || side.mencol === null || side.mencol > 4) && (
        <React.Fragment key={side.id}>
          {shouldRenderHeader && <Divider sx={{ mt: 1.5, mb: 1.5 }} />}
          <ItemLayout
            items={side.items}
            id={side.id}
            label={side.label}
            menprg={side.menprg}
            header={shouldRenderHeader ? side.menheader : null}
          />
        </React.Fragment>
      )
    );
  });

  return <>{ItemList}</>;
}

export function ItemList3_2<T extends any[]>({ items }: ItemListThirdProps<T>) {
  let lastHeader: string | null = null;
  let isFirstCol = true;

  const ItemList = items?.map((side: any, index: number) => {
    const shouldRenderHeader = side.menheader !== lastHeader;
    lastHeader = side.menheader;

    const isCol = side.mencol === "2";
    if (isCol) {
      if (isFirstCol) {
        isFirstCol = false;
        return (
          <React.Fragment key={side.id}>
            <ItemLayout
              items={side.items}
              id={side.id}
              label={side.label}
              menprg={side.menprg}
              header={shouldRenderHeader ? side.menheader : null}
            />
          </React.Fragment>
        );
      }
    }

    return (
      side.mencol === "2" && (
        <React.Fragment key={side.id}>
          {shouldRenderHeader && <Divider sx={{ mt: 1.5, mb: 1.5 }} />}
          <ItemLayout
            items={side.items}
            id={side.id}
            label={side.label}
            menprg={side.menprg}
            header={shouldRenderHeader ? side.menheader : null}
          />
        </React.Fragment>
      )
    );
  });

  return <>{ItemList}</>;
}

export function ItemList3_3<T extends any[]>({ items }: ItemListThirdProps<T>) {
  let lastHeader: string | null = null;
  let isFirstCol = true;

  const ItemList = items?.map((side: any, index: number) => {
    const shouldRenderHeader = side.menheader !== lastHeader;
    lastHeader = side.menheader;

    const isCol = side.mencol === "3";
    if (isCol) {
      if (isFirstCol) {
        isFirstCol = false;
        return (
          <React.Fragment key={side.id}>
            <ItemLayout
              items={side.items}
              id={side.id}
              label={side.label}
              menprg={side.menprg}
              header={shouldRenderHeader ? side.menheader : null}
            />
          </React.Fragment>
        );
      }
    }

    return (
      side.mencol === "3" && (
        <React.Fragment key={side.id}>
          {shouldRenderHeader && <Divider sx={{ mt: 1.5, mb: 1.5 }} />}
          <ItemLayout
            items={side.items}
            id={side.id}
            label={side.label}
            menprg={side.menprg}
            header={shouldRenderHeader ? side.menheader : null}
          />
        </React.Fragment>
      )
    );
  });

  return <>{ItemList}</>;
}

export function ItemList3_4<T extends any[]>({ items }: ItemListThirdProps<T>) {
  let lastHeader: string | null = null;
  let isFirstCol = true;

  const ItemList = items?.map((side: any, index: number) => {
    const shouldRenderHeader = side.menheader !== lastHeader;
    lastHeader = side.menheader;

    const isCol = side.mencol === "4";
    if (isCol) {
      if (isFirstCol) {
        isFirstCol = false;
        return (
          <React.Fragment key={side.id}>
            <ItemLayout
              items={side.items}
              id={side.id}
              label={side.label}
              menprg={side.menprg}
              header={shouldRenderHeader ? side.menheader : null}
            />
          </React.Fragment>
        );
      }
    }

    return (
      side.mencol === "4" && (
        <React.Fragment key={side.id}>
          {shouldRenderHeader && <Divider sx={{ mt: 1.5, mb: 1.5 }} />}
          <ItemLayout
            items={side.items}
            id={side.id}
            label={side.label}
            menprg={side.menprg}
            header={shouldRenderHeader ? side.menheader : null}
          />
        </React.Fragment>
      )
    );
  });

  return <>{ItemList}</>;
}
