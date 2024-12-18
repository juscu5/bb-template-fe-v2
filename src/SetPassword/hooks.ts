import { useState } from "react";

export const useShowPasswordCtrl = () => {
  const [isVisibleOldPass, setVisibleOldPass] = useState<boolean>(false);
  const [isVisibleNewPass, setVisibleNewPass] = useState<boolean>(false);
  const [isVisibleRetypePass, setVisibleRetypePass] = useState<boolean>(false);

  return {
    isVisibleOldPass,
    setVisibleOldPass,
    isVisibleNewPass,
    setVisibleNewPass,
    isVisibleRetypePass,
    setVisibleRetypePass,
  };
};
