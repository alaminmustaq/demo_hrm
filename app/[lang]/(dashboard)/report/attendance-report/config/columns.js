const val = (v, f = "—") => (v ?? v === 0 ? v : f);

let columns = (actions) => [
  {
    id: "name",
    header: "Employee Name",
    cell: ({ row }) =>
      `${row.original?.employee?.first_name || "Inactive"} ${row.original?.employee?.last_name || "Employee"}`,
  }, 

  // ✅ MASTER branch
  {
    id: "branch",
    header: "Branch",
    cell: ({ row }) => row.original?.branch?.name ?? "—",
  },
  
  // ✅ MASTER department
  {
    id: "department",
    header: "Department",
    cell: ({ row }) => row.original?.department?.name ?? "—",
  },

  // ✅ MASTER projects
  {
    id: "projects",
    header: "Project",
    cell: ({ row }) =>
      row.original?.projects?.length
        ? row.original.projects.map(p => p.name).join(", ")
        : "—",
  },

  {
    id: "date",
    header: "Date",
    cell: ({ row }) => val(row.original?.date),
  },

  {
    id: "check_in_time",
    header: "Check In Time",
    cell: ({ row }) => val(row.original?.check_in_time),
  },

  {
    id: "check_out_time",
    header: "Check Out Time",
    cell: ({ row }) => val(row.original?.check_out_time),
  },
  {
    id: "working_hours_formatted",
    header: "Working Hours",
    cell: ({ row }) => val(row.original?.working_hours_formatted),
  },
];

export default columns;
