import { lazy } from 'react';

export const StartPageAsync = lazy(
    //@ts-ignore
    () => new Promise((res) => res(import('./StartPage'))),
);
