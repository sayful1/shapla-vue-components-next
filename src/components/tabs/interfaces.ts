import { VNode } from "vue";

interface TabsDataInterface {
  tabs: VNode[];
  selectedIndex: number;
  count: number;
}

interface TabVNodeTypeInterface {
  name: string;
}

export { TabsDataInterface, TabVNodeTypeInterface };
