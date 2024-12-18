import { TabListContentProps } from "@/_shared/components/types/TabsTypes";
import DocNum from "./Docnum/";
import DateLock from "./Datelock/";

export const TabsConfiguration = () => {
  const TabsListContent: TabListContentProps[] = [
    {
      tabsName: "Code",
      tabsContent: <DocNum />,
    },
    {
      tabsName: "Date Lock",
      tabsContent: <DateLock />,
    },
  ];

  return { TabsListContent };
};
