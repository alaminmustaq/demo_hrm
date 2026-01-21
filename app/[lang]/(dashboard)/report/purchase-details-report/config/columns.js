import { format } from "date-fns";

const safe = (v, fallback = "—") => (v ?? v === 0 ? v : fallback);

const columns = () => [
  // Purchase Date
  {
    accessorKey: "purchase_date",
    header: "Date",
    cell: ({ row }) => {
      const v = row.original?.purchase_date;
      return v ? format(new Date(v), "yyyy-MM-dd") : "—";
    },
  },

  // Branch
  {
    accessorKey: "branch_name",
    header: "Branch",
    cell: ({ row }) => safe(row.original?.branch_name),
  },

  // Warehouse
  {
    accessorKey: "warehouse_name",
    header: "Warehouse",
    cell: ({ row }) => safe(row.original?.warehouse_name),
  },

  // Tool Name
  {
    accessorKey: "tool_name",
    header: "Tool Name",
    cell: ({ row }) => safe(row.original?.tool_name),
  },

  // Unit Price
  {
    accessorKey: "unit_price",
    header: "Unit Price",
    thClass: "!text-right",
    tdClass: "!text-right",
    cell: ({ row }) => safe(row.original?.unit_price),
  },

  // Quantity
  {
    accessorKey: "quantity",
    header: "Quantity",
    thClass: "!text-center",
    tdClass: "!text-center",
    cell: ({ row }) => safe(row.original?.quantity),
  },

  // Total Price
  {
    accessorKey: "total_price",
    header: "Total Price",
    thClass: "!text-right",
    tdClass: "!text-right",
    cell: ({ row }) => safe(row.original?.total_price),
  },
];

export default columns;
