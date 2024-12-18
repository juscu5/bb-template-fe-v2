import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import {
  ItemListFirst,
  ItemListSecond,
  ItemList3_1,
  ItemList3_2,
  ItemList3_3,
  ItemList3_4,
} from "./ItemList";
import {
  useToggleHandles,
  useEventHandles,
} from "@/_shared/components/Sidebar/EventHandler";
import Backdrop from "@mui/material/Backdrop";
import { SidebarProps } from "./types";
import {
  Drawer1,
  Drawer2,
  Drawer3_1,
  Drawer3_2,
  Drawer3_3,
  Drawer3_4,
} from "./Styles";

const defaultTheme = createTheme();

export default function Sidebar({ children }: SidebarProps) {
  const { open2, setOpen2, toggleDrawer2, open3, setOpen3, toggleDrawer3 } =
    useToggleHandles();
  const { items2, setItems2, items3, setItems3 } = useEventHandles();

  const col1 = items3?.some(
    (data: any) =>
      data.mencol === "1" || data.mencol === null || data.mencol > 4
  );
  const col2 = items3?.some((data: any) => data.mencol === "2");
  const col3 = items3?.some((data: any) => data.mencol === "3");
  const col4 = items3?.some((data: any) => data.mencol === "4");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <CssBaseline />

        {/* Drawer 1 */}
        <Drawer1 variant="permanent" onClick={toggleDrawer3(false)}>
          <List component="nav">
            <ItemListFirst
              open={open2}
              setItems={setItems2}
              setOpen={setOpen2}
            />
          </List>
        </Drawer1>
        <Backdrop
          sx={{ zIndex: 2 }}
          onClick={() => setOpen2(false)}
          open={open2}
        />

        {/* Drawer 2 */}
        <Drawer2
          variant="persistent"
          open={open2}
          onClose={toggleDrawer2(false)}
        >
          <List component="nav">
            <ItemListSecond
              items={items2}
              open={open3}
              setItems={setItems3}
              setOpen={setOpen3}
            />
          </List>
        </Drawer2>

        {/* Drawer 3 */}
        <Backdrop
          sx={{ zIndex: 3 }}
          onClick={() => setOpen3(false)}
          open={open3}
        />
        <Drawer3_1
          variant="persistent"
          open={open3}
          onClose={toggleDrawer3(false)}
          hidden={!col2 && !col3 && !col4 && !col1}
        >
          <List sx={{ marginTop: 1 }} component="nav">
            <ItemList3_1 items={items3} />
          </List>
        </Drawer3_1>
        <Drawer3_2
          variant="persistent"
          open={open3}
          onClose={toggleDrawer3(false)}
          hidden={!col3 && !col4 && !col2}
        >
          <List sx={{ marginTop: 1 }} component="nav">
            <ItemList3_2 items={items3} />
          </List>
        </Drawer3_2>

        <Drawer3_3
          variant="persistent"
          open={open3}
          onClose={toggleDrawer3(false)}
          hidden={!col4 && !col3}
        >
          <List sx={{ marginTop: 1 }} component="nav">
            <ItemList3_3 items={items3} />
          </List>
        </Drawer3_3>
        <Drawer3_4
          variant="persistent"
          open={open3}
          onClose={toggleDrawer3(false)}
          hidden={!col4}
        >
          <List sx={{ marginTop: 1 }} component="nav">
            <ItemList3_4 items={items3} />
          </List>
        </Drawer3_4>
        <Box sx={{ height: "100%", width: "100%" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          ></Toolbar>
          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
