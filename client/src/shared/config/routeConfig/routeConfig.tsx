import { Navigate, RouteProps } from 'react-router-dom';
import { ToolBar } from 'widgets/ToolBar';
import { Canvas } from 'widgets/CanvasBoard';
import { SettingBar } from 'widgets/SettingBar';

export enum AppRoutes {
    MAIN = 'main',
    NOT_FOUND = 'not_found',
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/:id',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: routePath.main,
        element: (
            <>
                <ToolBar />
                <SettingBar />
                <Canvas />
            </>
        ),
    },
    [AppRoutes.NOT_FOUND]: {
        path: routePath.not_found,
        element: <Navigate to={`f${(+new Date()).toString(16)}`} replace />,
    },
};
