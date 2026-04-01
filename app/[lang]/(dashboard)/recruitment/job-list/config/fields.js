const fields = () => {
    return [
        {
            name: "job_title",
            type: "input",
            label: "Job Title *",
            placeholder: "Enter job title",
            colSpan: "col-span-12",
            rules: {
                required: "Job title is required",
                maxLength: { value: 200, message: "Max 200 characters" },
            },
            inputProps: { maxLength: 200 },
        },
        {
            name: "status",
            type: "select",
            label: "Status *",
            placeholder: "Select status",
            colSpan: "col-span-12",
            options: [
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
            ],
            rules: {
                required: "Status is required",
            },
        },
        {
            name: "job_description",
            type: "rich-text",
            label: "Job Description",
            placeholder: "Enter detailed job description...",
            colSpan: "col-span-12",
        },
    ];
};

export default fields;
