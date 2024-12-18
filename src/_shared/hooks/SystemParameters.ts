import { getSystemParameters } from "../api/SysparApi";

export const useCheckedSystemParameters = (chkDocnum: string) => {
  const { data } = getSystemParameters();
  const sysParam = data?.data?.payload[0];
  const isDocnumChecked = sysParam?.[chkDocnum] === 0 ? false : true;
  return { isDocnumChecked };
};

export const useDocnumSystemParameters = (docnum: string) => {
  const { data, refetch: refetchSysPar } = getSystemParameters();
  const sysParam = data?.data?.payload[0];
  const docNum = sysParam?.[docnum];
  return { docNum, refetchSysPar };
};
