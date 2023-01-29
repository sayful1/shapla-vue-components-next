import { VNode } from "vue";

interface TabsDataInterface {
  tabs: VNode[];
  selectedIndex: number;
  count: number;
}

interface TabVNodeTypeInterface {
  name: string;
}

interface TabsPropsInterface {
  alignment?: "left" | "center" | "right";
  size?: "default" | "small" | "medium" | "large";
  tabStyle?: "default" | "boxed" | "rounded" | "toggle";
  fullwidth?: boolean;
  vertical?: boolean;
}

export { TabsDataInterface, TabVNodeTypeInterface, TabsPropsInterface };
