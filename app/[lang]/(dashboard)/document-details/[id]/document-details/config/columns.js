import { TableActions } from "@/components/table/TableActions";
import { useRouter, useParams } from "next/navigation";
const columns = (actions) => {
    const router = useRouter();
    const params = useParams();
    const lang = params?.lang || "en";

    return [
        {
            accessorKey: "sl_no",
            header: "SL No.",
            thClass: "!text-center",
            tdClass: "!text-center",
            cell: ({ row, table }) => row.index + 1, 
        },
        // TITLE
        {
            id: "title",
            header: "Title",
            accessorKey: "title",
        },

        // EMPLOYEE
        {
            id: "employee",
            header: "Employee",
            thClass: "!text-center",
            tdClass: "!text-center",
            cell: ({ row }) => {
                console.log("Row Data:", row.original);
                const emp = row.original.document?.employee;
                return emp ? `${emp.first_name} ${emp.last_name}` : "N/A";
            },
        },

        // CLIENT
        {
            id: "client",
            header: "Client",
            thClass: "!text-center",
            tdClass: "!text-center",
            cell: ({ row }) => {
                const client = row.original.document?.client;
                return client ? `${client.name} (${client.email})` : "N/A";
            },
        },

        // BRANCH
        {
            id: "branch",
            header: "Branch",
            thClass: "!text-center",
            tdClass: "!text-center",
            cell: ({ row }) => row.original.document?.branch?.name ?? "N/A",
        },

        // PROJECT
        {
            id: "project",
            header: "Project",
            thClass: "!text-center",
            tdClass: "!text-center",
            cell: ({ row }) => row.original.document?.project?.name ?? "N/A",
        },

        // EXPIRY DATE
        {
            id: "expiry_date",
            header: "Expiry Date",
            thClass: "!text-center",
            tdClass: "!text-center",
            cell: ({ row }) => {
                return row.original.expiry_date
                    ? new Date(row.original.expiry_date).toLocaleDateString()
                    : "N/A";
            },
        },

        // FILE
        {
            id: "file",
            header: "File",
            thClass: "!text-center",
            tdClass: "!text-center",
            cell: ({ row }) => {
                return row.original.file_url ? (
                    <a
                        href={row.original.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                    >
                        {row.original.file_name}
                    </a>
                ) : (
                    "N/A"
                );
            },
        },
    ];
};

export default columns;
