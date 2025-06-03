import { useRef, useEffect } from "react";

export default ({ value, onChange, name }) => {
    const textareaRef = useRef(null);

    const parseToCustomText = (obj) => {
        if (!obj) return "";
        return Object.entries(obj)
            .map(([key, value]) => `"${key}": "${value}";`)
            .join("\n");
    };

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
            ref={textareaRef}
            value={parseToCustomText(value)}
            onChange={onChange}
            onInput={handleInput}
            rows={1}
            name={name}
            style={{
                width: "100%",
                resize: "none",
                overflow: "hidden",
                lineHeight: "24px",
                fontSize: "1rem",
                padding: "8px",
            }}
            placeholder="Nhập nội dung mô tả..."
        />
    );
};
