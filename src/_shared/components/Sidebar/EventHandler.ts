import { useState } from "react";

export const useEventHandles = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [openSecondLevel, setOpenSecondLevel] = useState<string | null>(null);
  const [items2, setItems2] = useState<any | null>(null);
  const [items3, setItems3] = useState<any | null>(null);

  const handleClick = (item: string) => {
    setOpen(open === item ? null : item);
  };

  const handleMouseLeave = () => {
    setOpen(null);
    setOpenSecondLevel(null);
  };

  const handleClickSecondLevel = (item: string) => {
    setOpenSecondLevel(openSecondLevel === item ? null : item);
  };

  return {
    handleClick,
    handleMouseLeave,
    handleClickSecondLevel,
    open,
    openSecondLevel,
    items2,
    setItems2,
    items3,
    setItems3,
  };
};

export const useToggleHandles = () => {
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const toggleDrawer2 = (newOpen: boolean) => () => {
    setOpen2(newOpen);
  };
  const toggleDrawer3 = (newOpen: boolean) => () => {
    setOpen3(newOpen);
  };
  return {
    open2,
    setOpen2,
    toggleDrawer2,
    open3,
    setOpen3,
    toggleDrawer3,
  };
};
