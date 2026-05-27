import { BuildOptions } from './types/config';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackPluginInstance } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

export function buildPlugins({
    isDev,
    paths,
}: BuildOptions): WebpackPluginInstance[] {
    const plugins: WebpackPluginInstance[] = [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            minify: !isDev,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].chunk.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.redirects,
                    to: paths.build,
                },
            ],
        }),
        new webpack.ProgressPlugin()
    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    return plugins;
}
