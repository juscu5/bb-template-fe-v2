export interface SidebarProps {
  children: React.ReactNode;
}

export interface ItemListFirstProps<T> {
  setItems: any;
  setOpen: (setOpen: boolean) => void;
}

export interface ItemListSecondProps<T> {
  items: any;
}
