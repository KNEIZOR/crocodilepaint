import { RuleSetRule } from 'webpack';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
    const { isDev } = options;

    const babelLoader = buildBabelLoader();
    const cssLoader = buildCssLoader(isDev);

    const imageLoader = {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'assets/[hash][ext][query]',
        },
    };

    return [babelLoader, cssLoader, imageLoader];
}
