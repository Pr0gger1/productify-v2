interface CSS { [className: string]: string; }

declare module '*.css' {
    const css: CSS;
    export default css;
}

declare module '*.scss' {
    const css: CSS;
    export default css;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}
declare module '*.svg' {
    const value: string;
    export default value;
}