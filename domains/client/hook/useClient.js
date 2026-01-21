import {
    handleServerValidationErrors,
    formReset,
    normalizeSelectValues,
    debounce,
} from "@/utility/helpers";

import {
    useClientCreateMutation,
    useClientUpdateMutation,
    useClientDeleteMutation,
    useClientSearchQuery,
    useClientFetchQuery,
} from "../services/clientApi";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { branchSearchTemplate } from "@/utility/templateHelper";
import useAuth from "@/domains/auth/hooks/useAuth";

export const useClient = () => {
    const [clientCreate] = useClientCreateMutation();
    const [clientUpdate] = useClientUpdateMutation();
    const [clientDelete] = useClientDeleteMutation();

    // console.log(user);

    const { data: client, refetch, isFetching } = useClientFetchQuery();

    const { user } = useAuth();

    const form = useForm({
        mode: "onBlur",
        reValidateMode: "onSubmit",
        shouldFocusError: true,
    });

    const defaultValue = {
        branch_id:
            branchSearchTemplate(
                user?.employee?.branch ? [user?.employee?.branch] : []
            )?.at(0) ?? null,
             status: "active",
    };

    const { data: clientSearchResult } = useClientSearchQuery(
        { search: form.watch("search") },
        { skip: !form.watch("search") }
    );

    const clientState = {
        data: client?.data?.clients || [],
        form: {
            ...form,
            defaultValue: defaultValue,
        },
        refetch,

        pagination: client?.data?.pagination || {},
        isFetching,
    };

    const actions = {
        onCreate: async (data) => {
            try {
                let { openModel, ...other } = data;

                // ⬅️ Normalize branch_id
                let preparedData = normalizeSelectValues(other, ["branch_id"]);

                await clientCreate(preparedData).unwrap();
                toast.success("Client created successfully");

                refetch();
                formReset(form);
                form.setValue("openModel", false);
            } catch (apiErrors) {
                handleServerValidationErrors(apiErrors, form.setError);
            }
        },

        onEdit: (data) => {
            form.reset({
                id: data.id || "",
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                client_type: data.client_type || "individual",
                tax_id: data.tax_id || "",
                status: data.status || "prospect",
                address: data.address || "",
                observations: data.observations || "",

                branch_id:
                    branchSearchTemplate(data?.branch ? [data.branch] : [])?.at(
                        0
                    ) ?? null,
            });

            form.setValue("openModel", true);
        },

        onUpdate: async (data) => {
            try {
                let { id, openModel, ...other } = data;

                // ⬅️ Normalize branch_id here also
                let preparedData = normalizeSelectValues(other, ["branch_id"]);

                await clientUpdate({ id, credentials: preparedData }).unwrap();
                toast.success("Client updated successfully");

                refetch();
                formReset(form);
                form.setValue("openModel", false);
            } catch (apiErrors) {
                handleServerValidationErrors(apiErrors, form.setError);
            }
        },

        onDelete: async (id) => {
            if (confirm("Are you sure you want to delete this client?")) {
                try {
                    await clientDelete({ id }).unwrap();
                    toast.success("Client deleted successfully");
                    refetch();
                } catch {
                    toast.error("Something went wrong while deleting client.");
                }
            }
        },

        onSearch: debounce((inputValue, callback) => {
            form.setValue("search", inputValue);
            const res = clientSearchResult?.data?.clients || [];
            callback(res);
        }, 500),
    };

    return { actions, clientState };
};
