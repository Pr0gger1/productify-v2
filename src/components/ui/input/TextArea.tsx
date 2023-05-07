import React, {ComponentProps, FC, ReactNode} from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
    children?: ReactNode | JSX.Element
}

const TextArea: FC<TextAreaProps> = ({ children, ...props }) => {
    return (
        <textarea {...props}>
            {children}
        </textarea>
    );
};

export default TextArea;