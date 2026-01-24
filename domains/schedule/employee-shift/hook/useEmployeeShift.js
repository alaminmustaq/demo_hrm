import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formReset, handleServerValidationErrors } from "@/utility/helpers";
import {
  useCreateEmployeeShiftMutation,
  useUpdateEmployeeShiftMutation,
  useDeleteEmployeeShiftMutation,
  useFetchEmployeeShiftsQuery,
} from "../services/employeeShiftApi";

export const useEmployeeShift = () => {
  const [createEmployeeShift] = useCreateEmployeeShiftMutation();
  const [updateEmployeeShift] = useUpdateEmployeeShiftMutation();
  const [deleteEmployeeShift] = useDeleteEmployeeShiftMutation();
  const {
    data: employeeShiftData,
    refetch,
    isFetching,
  } = useFetchEmployeeShiftsQuery();

  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const defaultValue = {
    status: "active",
    type: "day shift",
  };

  const employeeShiftState = {
    data: employeeShiftData?.data?.employee_shifts || [],
    form: {
      ...form,
      defaultValue,
    },
    refetch,
    pagination: employeeShiftData?.data?.pagination || {},
    isFetching,
  };

  const actions = {
    onCreate: async (data) => {
      try {
        const { openModel, ...payload } = data;
        const response = await createEmployeeShift(payload).unwrap();

        if (response) {
          toast.success("Employee shift created successfully");
          refetch();
          formReset(form);
          form.setValue("openModel", false);
        }
      } catch (apiErrors) {
        handleServerValidationErrors(apiErrors, form.setError);
        toast.error("Failed to create employee shift");
      }
    },

    onEdit: (item) => {
      form.reset({
        id: item.id || "",
        name: item.name || "",
        type: item.type || "day shift",
        status: item.status || "active",
        description: item.description || "",
        openModel: true,
      });
      form.setValue("openModel", true);
    },

    onUpdate: async (data) => {
      try {
        const { openModel, id, ...payload } = data;
        const response = await updateEmployeeShift({ id, ...payload }).unwrap();

        if (response) {
          toast.success("Employee shift updated successfully");
          refetch();
          formReset(form);
          form.setValue("openModel", false);
        }
      } catch (apiErrors) {
        handleServerValidationErrors(apiErrors, form.setError);
        toast.error("Failed to update employee shift");
      }
    },

    onDelete: async (id) => {
      try {
        if (!confirm("Are you sure you want to delete this employee shift?"))
          return;

        const response = await deleteEmployeeShift(id).unwrap();

        if (response) {
          toast.success("Employee shift deleted successfully");
          refetch();
        }
      } catch (error) {
        console.error("Delete employee shift error:", error);

        const apiMessage =
          error?.data?.errors?.error ||
          error?.data?.message ||
          "Something went wrong while deleting employee shift.";

        toast.error(apiMessage);
      }
    },
  };

  return {
    actions,
    employeeShiftState,
  };
};
