"use client";

import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import BasicModel from "@/components/model/basic-model";
import columns from "./config/columns";
import fields from "./config/fields";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useScheduleSetup } from "@/domains/schedule/schedule-setup/hook/useScheduleSetup";

const ScheduleSetupPage = () => {
    const { actions, scheduleState } = useScheduleSetup();   
    return (
        <PageLayout>
            <BasicTableLayout
                addPermission={"manual-attendance"} 
                addButtonLabel={{
                        ScheduleSetup: {
                            label: "Add Schedule",
                            action: actions.onScheduleSetup,
                            permission: "create-holiday",
                        },
                        DeleteGroupApplication: {
                            label: "Delete Group Schedule",
                            action: actions.onDeleteGroupApplication,
                            permission: "delete-group-schedule",
                        }, 
                    }} 
                columns={columns(actions)}
                state={scheduleState}
                // filterCustom={{
                //     status: {
                //         multiple: true,
                //         values: [
                //             { key: "approved", value: "Approved" },
                //             { key: "rejected", value: "Rejected" },
                //         ],
                //     }
                // }}
            />

            <BasicModel 
                title={
                    scheduleState.form.watch("mode") === "view"
                    ? "Schedule Details"  
                    : scheduleState.form.watch("id")
                    ? "Edit Schedule Setup" 
                    : "Create Schedule Setup"
                    }
                submitLabel={
                    scheduleState.form.watch("mode") === "view"
                    ? null  
                    : scheduleState.form.watch("id")
                    ? "Update"
                    : "Create"
                } 
                cancelLabel="Close"
                size="2xl"
                form={scheduleState.form}
                fields={fields(actions,scheduleState.form)} 
                actions={actions}
            /> 
        </PageLayout>
    );
};

export default ScheduleSetupPage;
