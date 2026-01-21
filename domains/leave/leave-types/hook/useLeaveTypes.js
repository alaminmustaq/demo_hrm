import {
  handleServerValidationErrors,
  formReset,
} from "@/utility/helpers";
import {
  useCreateLeaveMutation,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
  useFetchLeaveQuery,
} from "../services/leaveTypesApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export const useLeaveTypes = () => {
  const [createLeave] = useCreateLeaveMutation();
  const [updateLeave] = useUpdateLeaveMutation();
  const [deleteLeave] = useDeleteLeaveMutation();
  const { data: leaveData, refetch, isFetching } = useFetchLeaveQuery();

  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const defaultValue = {
        status: "active",
    };

  const leaveState = {
    data: leaveData?.data?.leave_types || [],
     form: {
            ...form,
            defaultValue: defaultValue,
        },
    refetch,
    pagination: leaveData?.data?.pagination || {},
    isFetching,
  };
  // console.log(leaveData);
  
  const actions = {
    onCreate: async (data) => {
      try {
        const { openModel, ...payload } = data;
        const response = await createLeave(payload).unwrap();

        if (response) {
          toast.success("Leave created successfully");
          refetch();
          formReset(form);
          form.setValue("openModel", false);
        }
      } catch (apiErrors) {
        handleServerValidationErrors(apiErrors, form.setError);
        toast.error("Failed to create leave");
      }
    },

    onEdit: (item) => {
      form.reset({
        id: item.id || "",
        name: item.name || "",
        days_per_year: item.days_per_year || 0, // include allowed days
        status: item.status || "active",        // keep status
        is_paid: item.is_paid || "",        // keep status
        description: item.description || "",    // include description
        openModel: true,                         // open modal
      });
      form.setValue("openModel", true);
    },

    onUpdate: async (data) => {
      try {
        const { openModel, id, ...payload } = data;
        const response = await updateLeave({ id, ...payload }).unwrap();

        if (response) {
          toast.success("Leave updated successfully");
          refetch();
          formReset(form);
          form.setValue("openModel", false);
        }
      } catch (apiErrors) {
        handleServerValidationErrors(apiErrors, form.setError);
        toast.error("Failed to update leave");
      }
    },

    onDelete: async (id) => {
      try {
        if (!confirm("Are you sure you want to delete this leave?")) return;

        const response = await deleteLeave(id).unwrap();

        if (response) {
          toast.success("Leave deleted successfully");
          refetch();
        } else {
          toast.error("Failed to delete leave");
        }
      } catch (error) {
        console.error("Delete leave error:", error);
        toast.error("Something went wrong while deleting leave.");
      }
    },
  };

  return {
    actions,
    leaveState,
  };
};
