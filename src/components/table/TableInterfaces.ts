interface TableActionDataInterface {
  key: string;
  label: string;
}

interface TableColumnDataInterface {
  key: string;
  label: string;
  numeric?: boolean;
  sortable?: boolean;
}

interface ItemInterface {
  [key: string]: never;
}

export type { TableActionDataInterface, TableColumnDataInterface, ItemInterface };
