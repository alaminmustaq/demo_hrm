const fields = () => [
    {
        name: "company_name",
        type: "input",
        label: "Company Name *",
        placeholder: "Enter company name",
        colSpan: "col-span-12 md:col-span-6",
        rules: { required: "Company name is required" },
    },
    {
        name: "allowed_file_types",
        type: "multi-select",
        label: "Allowed File Types",
        placeholder: "Select File Types",
        colSpan: "col-span-12 md:col-span-6",
        options: [
                { label: "jpg", value: "jpg" },
                { label: "png", value: "png" },
                { label: "pdf", value: "pdf" },
                { label: "webp", value: "webp" },
            ],
    },

    // --- FILE UPLOADS ---
    {
        name: "icon",
        type: "file",
        label: "App Icon",
        placeholder: "Upload app icon",
        colSpan: "col-span-12 md:col-span-4",
        accept: "image/*",
    },
    {
        name: "logo",
        type: "file",
        label: "Company Logo",
        placeholder: "Upload company logo",
        colSpan: "col-span-12 md:col-span-4",
        accept: "image/*",
    
    },
    {
        name: "favicon",
        type: "file",
        label: "Favicon",
        placeholder: "Upload favicon",
        colSpan: "col-span-12 md:col-span-4",
        accept: "image/*",
    },

   
];

export default fields;
