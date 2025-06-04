import { useRef, useEffect } from "react";

export default ({ value }) => {
    const textareaRef = useRef(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        const lineHeight = 24;
        const maxLines = 20;
        const maxHeight = lineHeight * maxLines;
        textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    };

    useEffect(() => {
        handleInput();
    }, [value]);

    return (
        <textarea
            disabled
            ref={textareaRef}
            value={value}
            rows={1}
            style={{
                width: "100%",
                resize: "none",
                overflow: "hidden",
                lineHeight: "24px",
                fontSize: "1rem",
                padding: "8px",
            }}
        />
    );
};
