import { postCanvas } from 'entities/Canvas/model/services/postCanvas/postCanvas';
import { CanvasState } from './model/state/сanvasState';
import { CanvasHistory } from './model/state/canvasHistory';
import { useGetCanvas } from './model/hooks/useGetCanvas/useGetCanvas';

export const canvasState = new CanvasState();
export const canvasHistory = new CanvasHistory();
export { useGetCanvas, postCanvas };
