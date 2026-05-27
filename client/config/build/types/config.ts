export type BuildMode = 'development' | 'production';

export interface BuildOptions {
    isDev: boolean;
    mode: BuildMode;
    port: number;
    paths: BuildPaths;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
}

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    redirects: string;
    alias: buildAlias;
}

export interface buildAlias {
    style: string;
    app: string;
    shared: string;
    widgets: string;
    features: string;
    entities: string;
}
