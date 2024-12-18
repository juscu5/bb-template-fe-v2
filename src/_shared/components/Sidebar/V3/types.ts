export interface SidebarProps {
  children: React.ReactNode;
}

export interface ItemListFirstProps<T> {
  open: boolean;
  setItems: any;
  setOpen: (setOpen: boolean) => void;
}

export interface ItemListSecondProps<T> {
  items: any;
  open: boolean;
  setOpen: (setOpen: boolean) => void;
  setItems: any;
}

export interface ItemListThirdProps<T> {
  items?: any;
  id?: any;
  label?: string;
  menprg?: string;
  header?: string;
}
