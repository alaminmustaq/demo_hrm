const val = (v, f = "—") => (v ?? v === 0 ? v : f);

let columns = (actions) => [
  {
    id: "employee_name",
    header: "Employee Name",
    cell: ({ row }) => val(row.original?.employee_name),
  },
  {
    id: "branch_name",
    header: "Branch Name",
    cell: ({ row }) => val(row.original?.branch_name),
  },
  {
    id: "department_name",
    header: "Department Name",
    cell: ({ row }) => val(row.original?.department_name),
  },
  {
    id: "project_name",
    header: "Project Name",
    cell: ({ row }) => val(row.original?.project_name),
  },
  {
    id: "salary_type",
    header: "Salary Type",
    cell: ({ row }) => val(row.original?.salary_type),
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => val(row.original?.date),
  },
  {
    id: "check_in_time",
    header: "Check-in Time",
    cell: ({ row }) => val(row.original?.in_time),
  },
  {
    id: "check_out_time",
    header: "Check-out Time",
    cell: ({ row }) => val(row.original?.out_time),
  },
  {
    id: "late_minutes",
    header: "Late Minutes",
    cell: ({ row }) => val(row.original?.late_minutes),
  },
  {
    id: "total_minutes",
    header: "Total Minutes",
    cell: ({ row }) => val(row.original?.total_minutes),
  },
  {
    id: "overtime_minutes",
    header: "Overtime Minutes",
    cell: ({ row }) => val(row.original?.overtime_minutes),
  },
  {
    id: "early_minutes",
    header: "Early Minutes",
    cell: ({ row }) => val(row.original?.early_minutes),
  },
  {
    id: "break_minutes",
    header: "Break Minutes",
    cell: ({ row }) => val(row.original?.break_minutes),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => val(row.original?.status),
  },
];

export default columns;
