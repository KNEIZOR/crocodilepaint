import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolves } from './buildResolves';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { buildDevServer } from './buildDevServer';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { isDev, mode, paths } = options;

    return {
        mode,
        entry: paths.entry,

        output: {
            path: paths.build,
            filename: 'js/[name].[contenthash].js',
            chunkFilename: 'js/[name].[contenthash].chunk.js',
            clean: true,
            publicPath: '/',
        },

        optimization: {
            splitChunks: { chunks: 'all' },
            runtimeChunk: 'single',
            minimize: !isDev,
        },

        module: {
            rules: buildLoaders(options),
        },

        resolve: buildResolves(options),

        plugins: buildPlugins(options),

        devServer: isDev ? buildDevServer(options) : undefined,

        devtool: isDev ? 'inline-source-map' : false,
    };
}
