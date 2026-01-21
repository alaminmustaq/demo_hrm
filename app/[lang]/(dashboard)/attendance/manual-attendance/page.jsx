"use client";
import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import columns from "./config/columns";   
import fields from "./config/fields";     
import AdjustFields from "./config/adjustFields";     
import BasicModel from "@/components/model/basic-model";
import { useManualAttendance } from "@/domains/manual-attendance/hook/useManualAttendance"; // custom hook

const ManualAttendancePage = () => {
    const { actions, manualAttendanceState } = useManualAttendance(); 

    return (
        <>
            <PageLayout>
                <BasicTableLayout
                    addButtonLabel={{
                        GenerateSalary: {
                            label: "Add Attendance",
                            action: actions.onAddAttendance,
                            permission: "manual-attendance",
                        },
                        ApprovedSalary: {
                            label: "Adjust Hours",
                            action: actions.onAdjustHours,
                            permission: "adjust-hour",
                        },
                    }} 
                    columns={columns(actions)}
                    state={manualAttendanceState}
                />
                <BasicModel
                    title={
                        manualAttendanceState?.form?.watch("model_for") === "adjust_hours"
                            ? "Adjust Hours"
                            : manualAttendanceState?.form?.watch("id")
                                ? "Edit Attendance"
                                : "Add Attendance"
                    }
                    submitLabel={
                        manualAttendanceState?.form?.watch("model_for") === "adjust_hours"
                            ? "Save Hours"
                            : manualAttendanceState?.form?.watch("id")
                                ? "Update"
                                : "Create"
                    }
                    cancelLabel="Cancel"
                    size="4xl"
                    form={manualAttendanceState.form}
                    fields={manualAttendanceState?.form?.watch("model_for") == "adjust_hours" ? fields(actions,manualAttendanceState.form) : fields(actions,manualAttendanceState.form)}
                    actions={actions}
                />
            </PageLayout>
        </>
    );
};

export default ManualAttendancePage;
