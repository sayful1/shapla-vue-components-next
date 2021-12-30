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

export {TableActionDataInterface, TableColumnDataInterface}