import { lazy } from 'react';

export const PaintOnlinePageAsync = lazy(
    //@ts-ignore
    () => new Promise((res) => res(import('./PaintOnlinePage'))),
);
