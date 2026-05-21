import { useCanvasSession } from './model/hooks/useCanvasSession/useCanvasSession';
import { SessionStore } from './model/state/sessionStore';
export { sendSocketData } from './model/service/sendSocketData/sendSocketData';

export const sessionStore = new SessionStore();
export { useCanvasSession };
