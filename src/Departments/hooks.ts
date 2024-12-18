import { useState } from "react";

export const usePageCtrl = () => {
  const [isMainPageEnable, setMainPageEnable] = useState<boolean>(true);
  const [isAddPageEnable, setAddPageEnable] = useState<boolean>(false);
  const [isEditPageEnable, setEditPageEnable] = useState<boolean>(false);
  const [isViewPageEnable, setViewPageEnable] = useState<boolean>(false);

  return {
    isMainPageEnable,
    isAddPageEnable,
    isEditPageEnable,
    isViewPageEnable,
    setMainPageEnable,
    setAddPageEnable,
    setEditPageEnable,
    setViewPageEnable,
  };
};