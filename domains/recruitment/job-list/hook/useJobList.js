import {
    handleServerValidationErrors,
    formReset,
    prepareFilterPayload,
} from "@/utility/helpers";
import {
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
    useFetchJobListQuery,
} from "../services/jobListApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useJobList = () => {
    const router = useRouter();
    const [createJob] = useCreateJobMutation();
    const [updateJob] = useUpdateJobMutation();
    const [deleteJob] = useDeleteJobMutation();

    // For Filters
    const [filters, setFilters] = useState({});
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageFromUrl = searchParams.get("page") || "1";
    const queryParams = {
        ...filters,
        ...(pageFromUrl ? { page: pageFromUrl } : {}),
    };

    const {
        data: jobListData,
        refetch,
        isFetching,
    } = useFetchJobListQuery({ params: queryParams });

    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });

    const defaultValue = {
        status: "active",
    };

    const jobListState = {
        data: jobListData?.data?.job_lists || [],
        form: {
            ...form,
            defaultValue: defaultValue,
        },
        refetch,
        pagination: jobListData?.data?.pagination || {},
        isFetching,
    };

    const actions = {
        // FILTER
        onFilter: async () => {
            const values = form.getValues();
            const payload = prepareFilterPayload(values, searchParams);
            setFilters(payload);

            const params = new URLSearchParams({ page: "1" });
            Object.entries(payload).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => params.append(`${key}[]`, v));
                } else {
                    params.set(key, value);
                }
            });

            router.push(`${pathname}`);
            refetch();
        },

        // RESET
        onReset: async () => {
            const resetValues = Object.fromEntries(
                Object.entries(form.getValues()).map(([key, value]) => [
                    key,
                    Array.isArray(value) ? [] : "",
                ]),
            );
            form.reset(resetValues);
            setFilters({});
            await form.trigger();
            refetch();
        },

        // CREATE
        onCreate: async (data) => {
            try {
                const { openModel, ...payload } = data;
                const response = await createJob(payload).unwrap();

                if (response) {
                    toast.success("Job created successfully");
                    refetch();
                    formReset(form);
                    form.setValue("openModel", false);
                }
            } catch (apiErrors) {
                handleServerValidationErrors(apiErrors, form.setError);
                toast.error("Failed to create job");
            }
        },

        // EDIT - populate modal form
        onEdit: (item) => {
            form.reset({
                id: item.id || "",
                job_title: item.job_title || "",
                job_description: item.job_description || "",
                status: item.status || "active",
                openModel: true,
            });
            form.setValue("openModel", true);
        },

        // UPDATE
        onUpdate: async (data) => {
            try {
                const { openModel, id, ...payload } = data;
                const response = await updateJob({ id, ...payload }).unwrap();

                if (response) {
                    toast.success("Job updated successfully");
                    refetch();
                    formReset(form);
                    form.setValue("openModel", false);
                }
            } catch (apiErrors) {
                handleServerValidationErrors(apiErrors, form.setError);
                toast.error("Failed to update job");
            }
        },

        // DELETE
        onDelete: async (id) => {
            try {
                if (!confirm("Are you sure you want to delete this job?"))
                    return;

                const response = await deleteJob(id).unwrap();

                if (response) {
                    toast.success("Job deleted successfully");
                    refetch();
                }
            } catch (error) {
                console.error("Delete job error:", error);

                const apiMessage =
                    error?.data?.errors?.error ||
                    error?.data?.message ||
                    "Something went wrong while deleting the job.";

                toast.error(apiMessage);
            }
        },

        // VIEW JOB DETAILS
        onViewJobDetails: (id) => {
            const lang = pathname.split('/')[1] || 'en';
            window.open(`/${lang}/job-details/${id}`, '_blank');
        },

        // COPY LINK
        onCopyLink: (id) => {
            const lang = pathname.split('/')[1] || 'en';
            const url = `${window.location.origin}/${lang}/job-details/${id}`;
            navigator.clipboard.writeText(url);
            toast.success("Job link copied to clipboard");
        },
    };

    return {
        actions,
        jobListState,
    };
};
