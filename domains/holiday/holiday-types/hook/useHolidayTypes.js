import {
  handleServerValidationErrors,
  formReset,
} from "@/utility/helpers";
import {
  useCreateHolidayMutation,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
  useFetchHolidayQuery,
} from "../services/holidayTypesApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export const useHolidayTypes = () => {
  const [createHoliday] = useCreateHolidayMutation();
  const [updateHoliday] = useUpdateHolidayMutation();
  const [deleteHoliday] = useDeleteHolidayMutation();
  const { data: holidayData, refetch, isFetching } = useFetchHolidayQuery();

  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const defaultValue = {
        status: "active",
    };

  const holidayState = {
    data: holidayData?.data?.holiday_types || [],
     form: {
            ...form,
            defaultValue: defaultValue,
        },
    refetch,
    pagination: holidayData?.data?.pagination || {},
    isFetching,
  };
  // console.log(holidayData);
  
  const actions = {
    onCreate: async (data) => {
      try {
        const { openModel, ...payload } = data;
        const response = await createHoliday(payload).unwrap();

        if (response) {
          toast.success("Holiday created successfully");
          refetch();
          formReset(form);
          form.setValue("openModel", false);
        }
      } catch (apiErrors) {
        handleServerValidationErrors(apiErrors, form.setError);
        toast.error("Failed to create holiday");
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
        const response = await updateHoliday({ id, ...payload }).unwrap();

        if (response) {
          toast.success("Holiday updated successfully");
          refetch();
          formReset(form);
          form.setValue("openModel", false);
        }
      } catch (apiErrors) {
        handleServerValidationErrors(apiErrors, form.setError);
        toast.error("Failed to update holiday");
      }
    },

    onDelete: async (id) => {
      try {
        if (!confirm("Are you sure you want to delete this holiday?")) return;

        const response = await deleteHoliday(id).unwrap();

        if (response) {
          toast.success("Holiday deleted successfully");
          refetch();
        }
      } catch (error) {
        console.error("Delete holiday error:", error);

        // ✅ Read API error message
        const apiMessage =
          error?.data?.errors?.error ||
          error?.data?.message ||
          "Something went wrong while deleting holiday.";

        toast.error(apiMessage);
      }
    },
  };

  return {
    actions,
    holidayState,
  };
};
