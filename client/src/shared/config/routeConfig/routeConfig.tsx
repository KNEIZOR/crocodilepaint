import { Navigate, RouteProps } from 'react-router-dom';
import { PaintOnlinePage } from 'src/pages/PaintOnlinePage';
import { StartPage } from 'src/pages/StartPage';

export enum AppRoutes {
    START = 'start',
    PAINT_ONLINE = 'paint_online',
    NOT_FOUND = 'not_found',
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.START]: '/',
    [AppRoutes.PAINT_ONLINE]: '/paint-online/:id',
    [AppRoutes.NOT_FOUND]: '/paint-online/*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.START]: {
        path: routePath.start,
        element: <StartPage />
    },
    [AppRoutes.PAINT_ONLINE]: {
        path: routePath.paint_online,
        element: (
            <PaintOnlinePage />
        ),
    },
    [AppRoutes.NOT_FOUND]: {
        path: routePath.not_found,
        element: <Navigate to={`/paint-online/f${(+new Date()).toString(16)}`} replace />,
    },
};
