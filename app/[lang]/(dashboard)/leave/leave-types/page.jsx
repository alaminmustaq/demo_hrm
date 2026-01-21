"use client";

import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import BasicModel from "@/components/model/basic-model";
import columns from "./config/columns";
import fields from "./config/fields";
import { useLeaveTypes } from "@/domains/leave/leave-types/hook/useLeaveTypes";

const LeaveTypesPage = () => {
    const { actions, leaveState } = useLeaveTypes();

    return (
        <PageLayout>
            <BasicTableLayout
                addPermission={"create-leave-type"}
                addButtonLabel="Add Leave Types"
                columns={columns(actions)}
                state={leaveState}
            />

            <BasicModel
                title={
                    leaveState?.form?.watch("id")
                        ? "Edit Leave Types"
                        : "Create Leave Types"
                }
                submitLabel={
                    leaveState?.form?.watch("id") ? "Update" : "Create"
                }
                cancelLabel="Cancel"
                size="2xl"
                form={leaveState.form}
                fields={fields}
                actions={actions} // <-- pass full actions like BranchPage
            />
        </PageLayout>
    );
};

export default LeaveTypesPage;
