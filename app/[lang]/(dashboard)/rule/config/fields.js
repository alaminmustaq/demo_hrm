const fields = () => [
    {
        name: "min_age",
        type: "input",
        label: "Minimum Employee Age",
        placeholder: "Enter minimum age",
        colSpan: "col-span-12 md:col-span-6",
        rules: {
            required: "Minimum age is required",
            min: { value: 0, message: "Minimum age cannot be negative" },
        },
    },
    {
        name: "max_age",
        type: "input",
        label: "Maximum Employee Age",
        placeholder: "Enter maximum age",
        colSpan: "col-span-12 md:col-span-6",
        rules: {
            required: "Maximum age is required",
            min: { value: 0, message: "Maximum age cannot be negative" },
        },
    },
];

export default fields;
