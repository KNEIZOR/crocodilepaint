import { Navigate, RouteProps } from 'react-router-dom';
import { CrocodilePage } from 'src/pages/CrocodilePage';
import { PaintOnlinePage } from 'src/pages/PaintOnlinePage';
import { StartPage } from 'src/pages/StartPage';

export enum AppRoutes {
    START = 'start',
    PAINT_ONLINE = 'paint_online',
    PAINT_ONLINE_NOT_FOUND = 'paint_not_found',
    CROCODILE = 'crocodile',
    CROCODILE_NOT_FOUND = 'crocodile_not_found',
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.START]: '/',
    [AppRoutes.PAINT_ONLINE]: '/paint-online/:id',
    [AppRoutes.PAINT_ONLINE_NOT_FOUND]: '/paint-online/*',
    [AppRoutes.CROCODILE]: '/crocodile/:id',
    [AppRoutes.CROCODILE_NOT_FOUND]: '/crocodile/*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.START]: {
        path: routePath.start,
        element: <StartPage />,
    },
    [AppRoutes.PAINT_ONLINE]: {
        path: routePath.paint_online,
        element: <PaintOnlinePage />,
    },
    [AppRoutes.PAINT_ONLINE_NOT_FOUND]: {
        path: routePath.paint_not_found,
        element: (
            <Navigate
                to={`/paint-online/f${(+new Date()).toString(16)}`}
                replace
            />
        ),
    },
    [AppRoutes.CROCODILE]: {
        path: routePath.crocodile,
        element: (
            <CrocodilePage />
        ),
    },
    [AppRoutes.CROCODILE_NOT_FOUND]: {
        path: routePath.crocodile_not_found,
        element: <Navigate to={`/crocodile/f${(+new Date()).toString(16)}`} replace />,
    },
};
