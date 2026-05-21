import { makeAutoObservable } from 'mobx';
import { ITool } from '../types/tools';

export class ToolState {
    activeTool: ITool | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool: ITool) {
        this.activeTool = tool;
    }

    setFillColor(color: string) {
        if (this.activeTool && this.activeTool.ctx) {
            this.activeTool.fillColor = color
        }
    }

    setStrokelColor(color: string) {
        if (this.activeTool) {
            this.activeTool.strokeColor = color;
        }
    }

    setLineWidth(width: number) {
        if (this.activeTool) {
            this.activeTool.lineWidth = width;
        }
    }
}
