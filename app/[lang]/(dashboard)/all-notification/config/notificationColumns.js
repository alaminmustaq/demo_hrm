const notificationColumns = (actions) => [
  {
    accessorKey: "type",
    header: "Type",
    thClass: "!text-left",
    tdClass: "!text-left",
  },
  {
    accessorKey: "data",
    header: "Message",
    thClass: "!text-left",
    tdClass: "!text-left",
    cell: ({ row }) => {
      try {
        const data = JSON.parse(row.original.data);
        return data.message || "—";
      } catch {
        return row.original.data || "—";
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    thClass: "!text-center",
    tdClass: "!text-center",
    cell: ({ row }) => {
      const status = row.original.status || "—";
      const className =
        status === "pending"
          ? "bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full"
          : status === "sent"
          ? "bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
          : "bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full";
      return <span className={className}>{status === "sent" ? "Seen": "Pending"}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    thClass: "!text-center",
    tdClass: "!text-center",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleString() || "—",
  }, 
];

export default notificationColumns;
