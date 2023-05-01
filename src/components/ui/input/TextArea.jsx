import React from 'react';

const TextArea = ({ children, ...props }) => {
    return (
        <textarea {...props}>
        </textarea>
    );
};

export default TextArea;