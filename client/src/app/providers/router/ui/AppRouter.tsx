import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig';

export const AppRouter = () => {
    return (
        <div>
            <Routes>
                {Object.values(routeConfig).map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    );
};

