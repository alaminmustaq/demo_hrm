import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
    useFetchRulesQuery,
    useUpdateRulesMutation,
} from "../services/ruleApi";
import toast from "react-hot-toast";

export const useRule = () => {
    const { data, isFetching } = useFetchRulesQuery();
    const [updateRules] = useUpdateRulesMutation();

    const form = useForm({ defaultValues: {} });

    useEffect(() => {
        if (data?.data) {
            form.reset(data.data); 
        }
    }, [data]);

    const onUpdate = async (values) => {
        try {
            await updateRules(values).unwrap();
            toast.success("Rules updated successfully");
        } catch (e) {
            toast.error("Failed to update rules");
        }
    };

    return {
        ruleState: { form, isFetching },
        actions: { onUpdate },
    };
};
