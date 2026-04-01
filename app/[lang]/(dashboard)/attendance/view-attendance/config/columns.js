const val = (v, f = "—") => ((v ?? v === 0) ? v : f);
import { TableActions } from "@/components/table/TableActions";

let columns = (actions, user) => [
    // Employee
    {
        id: "name",
        header: "Name",
        cell: ({ row }) =>
            `${row.original?.employee?.first_name || "inactive"}  ${row.original?.employee?.last_name || "Employee"}`,
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

    // Salary Type
    {
        id: "salary_type",
        header: "Salary Type",
        cell: ({ row }) =>
            val(row.original?.salary_type)
                ? String(row.original?.salary_type).charAt(0).toUpperCase() +
                  String(row.original?.salary_type).slice(1)
                : "-",
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

    // Actions
    ...(user?.role_id === 3
        ? []
        : [
              {
                  id: "actions",
                  enableHiding: false,
                  header: " ",
                  thClass: "!text-center w-[70px] whitespace-nowrap",
                  tdClass: "!text-center w-[70px] whitespace-nowrap",
                  cell: ({ row }) => (
                      <TableActions
                          data={row.original}
                          label="Actions"
                          items={[
                              {
                                  label: "Edit",
                                  onClick: actions?.onEdit,
                                  permission: "edit-attendance",
                              },
                              {
                                  label: "Delete",
                                  onClick: (data) => actions?.onDelete(data),
                                  danger: true,
                                  permission: "delete-attendance",
                              },
                          ]}
                      />
                  ),
              },
          ]),
];

export default columns;
