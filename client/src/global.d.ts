declare module '*.module.scss' {
    const classes: Record<string, string>;
    export default classes;
}

declare module '*.scss' {
    const classes: Record<string, string>;
    export default classes;
}

declare module '*.png' {
    const content: string;
    export default content;
}
