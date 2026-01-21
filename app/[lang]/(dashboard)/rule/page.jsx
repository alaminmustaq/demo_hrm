"use client";

import PageLayout from "@/components/page-layout";
import { DynamicForm } from "@/components/form/dynamic-form";
import { useRule } from "@/domains/rule/hook/useRule";
import fields from "./config/fields";

const RulesPage = () => {
    const { ruleState, actions } = useRule();
    const { form } = ruleState;

    const onSubmit = (values) => {
        if (+values.max_age <= +values.min_age) {
            form.setError("max_age", {
                message: "Maximum age must be greater than minimum age",
            });
            return;
        }

        actions.onUpdate(values);
    };

    return (
        <PageLayout>
            <div className="bg-white p-6 rounded-md shadow">
                <DynamicForm
                    form={form}
                    fields={fields()}
                    onSubmit={onSubmit}
                    submitLabel="Save Rules"
                />

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={form.handleSubmit(onSubmit)}
                        className="bg-primary text-white px-5 py-2 rounded-md"
                    >
                        Save Rules
                    </button>
                </div>
            </div>
        </PageLayout>
    );
};

export default RulesPage;
