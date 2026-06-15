import { lazy } from 'react';

export const CrocodilePageAsync = lazy(
    //@ts-ignore
    () => new Promise((res) => res(import('./CrocodilePage'))),
);
