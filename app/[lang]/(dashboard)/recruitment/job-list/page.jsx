"use client";

import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import BasicModel from "@/components/model/basic-model";
import columns from "./config/columns";
import fields from "./config/fields";
import { DynamicForm } from "@/components/form/dynamic-form";
import filterFields from "./config/filterFields";
import ReportActions from "@/components/report/ReportActions";
import { useState } from "react";
import CollapsibleToggleButton from "@/components/ui/CollapsibleToggleButton";
import { useJobList } from "@/domains/recruitment/job-list/hook/useJobList";

const JobListPage = () => {
    const { actions, jobListState } = useJobList();
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
                        form={jobListState.form}
                        fields={filterFields(jobListState.form)}
                        onSubmit={() => actions.onFilter}
                    />
                    <ReportActions
                        form={jobListState.form}
                        onAction={actions.onFilter}
                        onReset={actions.onReset}
                        showPdf={false}
                        showExcel={false}
                    />
                </div>
            )}

            <BasicTableLayout
                addPermission={"view-project"}
                addButtonLabel="Add Job"
                columns={columns(actions)}
                state={jobListState}
            />

            <BasicModel
                title={
                    jobListState?.form?.watch("id") ? "Edit Job" : "Create Job"
                }
                submitLabel={
                    jobListState?.form?.watch("id") ? "Update" : "Create"
                }
                cancelLabel="Cancel"
                size="3xl"
                form={jobListState.form}
                fields={fields}
                actions={actions}
            />
        </PageLayout>
    );
};

export default JobListPage;
