import { lazy } from 'react';

<<<<<<< HEAD
export const CrocodilePageAsync = lazy(
=======
export const PaintOnlinePageAsync = lazy(
>>>>>>> 2dc88a516c6304ce9ee0c26c2c64d3b1d98357e5
    //@ts-ignore
    () => new Promise((res) => res(import('./CrocodilePage'))),
);
