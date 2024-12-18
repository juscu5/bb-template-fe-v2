export interface TabListContentProps {
  tabsName: string;
  tabsContent: React.ReactElement;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export interface LSTVTabsProps {
  tabsListContent: TabListContentProps[];
}
