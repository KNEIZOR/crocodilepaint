export interface WsData {
    id: string;
    method: string;
    username: string;
    figure: {
        type: string;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        color?: string;
    };
}