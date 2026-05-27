import path from 'node:path';
import type { Configuration } from 'webpack';

import { BuildEnv, BuildPaths } from './config/build/types/config';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        redirects: path.resolve(__dirname, 'public/_redirects'),
        alias: {
            style: path.resolve(__dirname, 'src/app/styles'),
            app: path.resolve(__dirname, 'src/app'),
            shared: path.resolve(__dirname, 'src/shared'),
            widgets: path.resolve(__dirname, 'src/widgets'),
            features: path.resolve(__dirname, 'src/features'),
            entities: path.resolve(__dirname, 'src/entities'),
        },
    };

    const mode = env.mode || 'development';
    const port = env.port || 3000;

    const isDev = mode === 'development';

    const config: Configuration = buildWebpackConfig({
        isDev,
        mode,
        port,
        paths,
    });

    return config;
};
