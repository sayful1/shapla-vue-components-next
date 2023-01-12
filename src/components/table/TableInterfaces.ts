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
  [key: string]: string | number | boolean | unknown;
}

export { TableActionDataInterface, TableColumnDataInterface, ItemInterface };
