import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolves(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            style: options.paths.alias.style,
            app: options.paths.alias.app,
            shared: options.paths.alias.shared,
            widgets: options.paths.alias.widgets,
            features: options.paths.alias.features,
            entities: options.paths.alias.entities,
        },
    };
}
