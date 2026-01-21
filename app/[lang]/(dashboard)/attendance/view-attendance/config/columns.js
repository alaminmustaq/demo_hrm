const val = (v, f = "—") => (v ?? v === 0 ? v : f);

let columns = (actions) => [
  // Employee
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => `${row.original?.employee?.first_name || "inactive" }  ${row.original?.employee?.last_name || 'Employee'}` ,
  },
  {
    id: "employee_number",
    header: "Employee Code",
    cell: ({ row }) => val(row.original?.employee?.employee_code),
  },

  

  // Branch
  {
    id: "branch",
    header: "Branch",
    cell: ({ row }) => row.original?.employee?.branch?.name ?? "-",
  },

  
  // Date
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => val(row.original?.date),
  },

  // Check In / Check Out
  {
    id: "check_in_time",
    header: "Check In Time",
    cell: ({ row }) => val(row.original?.check_in_time),
  },
  // Check Out / Check Out
  {
    id: "check_out_time",
    header: "Check Out Time",
    cell: ({ row }) => val(row.original?.check_out_time),
  },

];

export default columns;
