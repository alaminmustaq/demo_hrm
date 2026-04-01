"use client";

import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import BasicModel from "@/components/model/basic-model";
import columns from "./config/columns";
import fields from "./config/fields";
import { useForm } from "react-hook-form";
import { DynamicForm } from "@/components/form/dynamic-form";
import filterFields from "./config/filterFields";
import ReportActions from "@/components/report/ReportActions";
import { useEffect, useState } from "react";
import CollapsibleToggleButton from "@/components/ui/CollapsibleToggleButton";
import { useOvertime } from "@/domains/Overtime/hooks/useOvertime";

const OvertimePage = () => {
    const { actions, overtimeState } = useOvertime();
    const [filtersOpen, setFiltersOpen] = useState(false);

    return (
        <PageLayout>
            {/* Filter Header */}
            <div className="mb-4 flex justify-between items-center">
                <CollapsibleToggleButton
                    isOpen={filtersOpen}
                    onToggle={() => setFiltersOpen((prev) => !prev)}
                />
            </div>

            {/* Collapsible Filter Panel */}
            {filtersOpen && (
                <div className="bg-white p-6 rounded-md shadow mb-6 transition-all duration-300">
                    <DynamicForm
                        form={overtimeState.form}
                        fields={filterFields(overtimeState.form, actions)}
                        onSubmit={() => actions.onFilter}
                    />
                    <ReportActions
                        form={overtimeState.form}
                        onAction={actions.onFilter}
                        onReset={actions.onReset}
                        showPdf={false} // Adjust as needed
                        showExcel={false}
                    />
                </div>
            )}
            <BasicTableLayout
                addPermission={"manual-attendance"} // Adjust permission
                addButtonLabel={{
                    Overtime: {
                        label: "Add Overtime",
                        action: actions.onOpenModal, 
                        permission: "create-overtime", // Adjust permission
                        color: 'primary'
                    },
                }}
                columns={columns(actions)}
                state={overtimeState} 
            />

            <BasicModel
                title={
                    overtimeState.form.watch("mode") === "view"
                        ? "Overtime Details"
                        : overtimeState.form.watch("id")
                            ? "Edit Overtime"
                            : "Create Overtime"
                }
                submitLabel={
                    overtimeState.form.watch("mode") === "view"
                        ? null
                        : overtimeState.form.watch("id")
                            ? "Update"
                            : "Create"
                }
                cancelLabel="Close"
                size="5xl"
                form={overtimeState.form}
                fields={fields(overtimeState.form, actions)}
                actions={actions}
            />
        </PageLayout>
    );
};

export default OvertimePage;
