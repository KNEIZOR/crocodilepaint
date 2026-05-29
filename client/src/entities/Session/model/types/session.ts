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
        radius?: number;
        currentX?: number;
        currentY?: number;
        color?: string;
        stroke?: string;
        lineWidth?: number;
        canvas?: string | undefined;
    };
}
