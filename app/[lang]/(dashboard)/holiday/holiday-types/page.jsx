"use client";

import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import BasicModel from "@/components/model/basic-model";
import columns from "./config/columns";
import fields from "./config/fields";
import { useHolidayTypes } from "@/domains/holiday/holiday-types/hook/useHolidayTypes";

const HolidayTypesPage = () => {
    const { actions, holidayState } = useHolidayTypes();

    return (
        <PageLayout>
            <BasicTableLayout
                addPermission={"create-holiday-type"}
                addButtonLabel="Add Holiday Types"
                columns={columns(actions)}
                state={holidayState}
            />

            <BasicModel
                title={
                    holidayState?.form?.watch("id")
                        ? "Edit Holiday Types"
                        : "Create Holiday Types"
                }
                submitLabel={
                    holidayState?.form?.watch("id") ? "Update" : "Create"
                }
                cancelLabel="Cancel"
                size="2xl"
                form={holidayState.form}
                fields={fields}
                actions={actions} // <-- pass full actions like BranchPage
            />
        </PageLayout>
    );
};

export default HolidayTypesPage;
