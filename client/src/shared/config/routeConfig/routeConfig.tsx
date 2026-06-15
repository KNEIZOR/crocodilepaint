import { Navigate, RouteProps } from 'react-router-dom';
<<<<<<< HEAD
import { CrocodilePage } from 'src/pages/CrocodilePage';
=======
import CrocodilePage from 'src/pages/CrocodilePage/ui/CrocodilePage';
>>>>>>> 2dc88a516c6304ce9ee0c26c2c64d3b1d98357e5
import { PaintOnlinePage } from 'src/pages/PaintOnlinePage';
import { StartPage } from 'src/pages/StartPage';

export enum AppRoutes {
    START = 'start',
    PAINT_ONLINE = 'paint_online',
<<<<<<< HEAD
    PAINT_ONLINE_NOT_FOUND = 'paint_not_found',
    CROCODILE = 'crocodile',
    CROCODILE_NOT_FOUND = 'crocodile_not_found',
=======
    CROCODILE = 'crocodile',
    CROCODILE_NOT_FOUND = 'crocodile_not_found',
    PAINT_NOT_FOUND = 'paint_not_found',
    NOT_FOUND = 'not_found',
>>>>>>> 2dc88a516c6304ce9ee0c26c2c64d3b1d98357e5
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.START]: '/',
    [AppRoutes.CROCODILE]: '/crocodile/:id',
    [AppRoutes.CROCODILE_NOT_FOUND]: '/crocodile/*',
    [AppRoutes.PAINT_ONLINE]: '/paint-online/:id',
<<<<<<< HEAD
    [AppRoutes.PAINT_ONLINE_NOT_FOUND]: '/paint-online/*',
    [AppRoutes.CROCODILE]: '/crocodile/:id',
    [AppRoutes.CROCODILE_NOT_FOUND]: '/crocodile/*',
=======
    [AppRoutes.PAINT_NOT_FOUND]: '/paint-online/*',
    [AppRoutes.NOT_FOUND]: '/*',
>>>>>>> 2dc88a516c6304ce9ee0c26c2c64d3b1d98357e5
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.START]: {
        path: routePath.start,
        element: <StartPage />,
    },
    [AppRoutes.CROCODILE]: {
        path: routePath.crocodile,
        element: <CrocodilePage />,
    },
    [AppRoutes.CROCODILE_NOT_FOUND]: {
        path: routePath.crocodile_not_found,
        element: (
            <Navigate
                to={`/crocodile/f${(+new Date()).toString(16)}`}
                replace
            />
        ),
    },
    [AppRoutes.PAINT_ONLINE]: {
        path: routePath.paint_online,
        element: <PaintOnlinePage />,
    },
    [AppRoutes.PAINT_NOT_FOUND]: {
        path: routePath.paint_not_found,
        element: (
            <Navigate
                to={`/paint-online/f${(+new Date()).toString(16)}`}
                replace
            />
        ),
    },
<<<<<<< HEAD
    [AppRoutes.PAINT_ONLINE_NOT_FOUND]: {
        path: routePath.paint_not_found,
        element: <Navigate to={`/paint-online/f${(+new Date()).toString(16)}`} replace />,
=======
    [AppRoutes.NOT_FOUND]: {
        path: routePath.not_found,
        element: <Navigate to={'/'} replace />,
>>>>>>> 2dc88a516c6304ce9ee0c26c2c64d3b1d98357e5
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
