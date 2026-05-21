import path from 'node:path';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const isDev = true;

const cssLoaders = (modules = false) => [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: modules
            ? {
                  modules: {
                      localIdentName: isDev
                          ? '[path][name]__[local]'
                          : '[hash:base64:8]',
                  },
              }
            : {},
    },
    'sass-loader',
];

const config: Configuration & { devServer?: DevServerConfiguration } = {
    mode: isDev ? 'development' : 'production',

    entry: './src/index.tsx',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        clean: true,
    },

    module: {
        rules: [
            // TS / React
            {
                test: /\.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                'i18next-extract',
                                {
                                    locales: ['ru', 'en'],
                                    keyAsDefaultValue: true,
                                },
                            ],
                            isDev && require.resolve('react-refresh/babel'),
                        ].filter(Boolean),
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            // CSS Modules (only .module.scss)
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                namedExport: false,
                                localIdentName: isDev
                                    ? '[path][name]__[local]'
                                    : '[hash:base64:8]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /\.module\.s[ac]ss$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },

            // CSS
            {
                test: /\.css$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },

            // Images
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
            
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],

        plugins: [new TsconfigPathsPlugin()],

        alias: {
            style: path.resolve(__dirname, 'src/app/styles'),
            app: path.resolve(__dirname, 'src/app'),
            shared: path.resolve(__dirname, 'src/shared'),
            widgets: path.resolve(__dirname, 'src/widgets'),
            features: path.resolve(__dirname, 'src/features'),
            entities: path.resolve(__dirname, 'src/entities'),
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new ReactRefreshWebpackPlugin(),

        !isDev &&
            new MiniCssExtractPlugin({
                filename: 'styles/[name].[contenthash].css',
            }),
    ],

    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
    },

    devtool: isDev ? 'source-map' : false,
};

export default config;
