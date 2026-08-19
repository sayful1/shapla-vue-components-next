interface TableActionDataInterface {
  key: string;
  label: string;
  type?: "manual" | "link";
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
}

interface TableColumnDataInterface {
  key: string;
  label: string;
  numeric?: boolean;
  sortable?: boolean;
}

interface ShaplaTableStatusInterface {
  key: string;
  label: string;
  count: number;
  active: boolean;
}

export type {
  TableActionDataInterface,
  TableColumnDataInterface,
  ShaplaTableStatusInterface,
};
