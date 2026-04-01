"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

// Dynamically import to avoid SSR issues with Quill
const ReactQuill = dynamic(
    async () => {
        const { useQuill } = await import("react-quilljs");
        // Return a wrapper component
        const QuillWrapper = ({ value, onChange, placeholder, disabled }) => {
            const { quill, quillRef } = useQuill({
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ color: [] }, { background: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ align: [] }],
                        ["link"],
                        ["clean"],
                    ],
                },
                placeholder: placeholder || "Enter description...",
                readOnly: disabled || false,
            });

            const isInitialized = useRef(false);

            useEffect(() => {
                if (quill && !isInitialized.current && value) {
                    quill.clipboard.dangerouslyPasteHTML(value);
                    isInitialized.current = true;
                }
            }, [quill, value]);

            useEffect(() => {
                if (quill) {
                    const handler = () => {
                        const html = quill.root.innerHTML;
                        const isEmpty =
                            html === "<p><br></p>" || html === "";
                        onChange(isEmpty ? "" : html);
                    };
                    quill.on("text-change", handler);
                    return () => quill.off("text-change", handler);
                }
            }, [quill, onChange]);

            return (
                <div
                    ref={quillRef}
                    style={{ minHeight: "160px" }}
                />
            );
        };
        return QuillWrapper;
    },
    { ssr: false },
);

const RichTextEditor = ({ value, onChange, placeholder, disabled }) => {
    return (
        <div className="rich-text-editor-wrapper">
            <ReactQuill
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
};

export default RichTextEditor;
