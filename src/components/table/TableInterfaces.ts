interface TableActionDataInterface {
  key: string,
  label: string,
}

interface TableColumnDataInterface {
  key: string,
  label: string,
  numeric?: boolean,
  sortable?: boolean,
}

interface ItemInterface {
  [key: string]: any;
}

export {TableActionDataInterface, TableColumnDataInterface, ItemInterface}