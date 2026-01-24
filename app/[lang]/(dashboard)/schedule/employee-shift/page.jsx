"use client";

import PageLayout from "@/components/page-layout";
import BasicTableLayout from "@/components/table/basic-table-layout";
import BasicModel from "@/components/model/basic-model";
import columns from "./config/columns";
import fields from "./config/fields";
import { useEmployeeShift } from "@/domains/schedule/employee-shift/hook/useEmployeeShift";

const EmployeeShiftPage = () => {
  const { actions, employeeShiftState } = useEmployeeShift();

  return (
    <PageLayout>
      <BasicTableLayout
        addPermission="create-holiday-type"
        addButtonLabel="Add Employee Shift"
        columns={columns(actions)}
        state={employeeShiftState}
      />

      <BasicModel
        title={
          employeeShiftState?.form?.watch("id")
            ? "Edit Employee Shift"
            : "Create Employee Shift"
        }
        submitLabel={
          employeeShiftState?.form?.watch("id") ? "Update" : "Create"
        }
        cancelLabel="Cancel"
        size="2xl"
        form={employeeShiftState.form}
        fields={fields}
        actions={actions}
      />
    </PageLayout>
  );
};

export default EmployeeShiftPage;
