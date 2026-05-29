import Brush from 'features/canvasTools/brush/Brush';
import Cirlce from 'features/canvasTools/circle/Circle';
import Eraser from 'features/canvasTools/eraser/Eraser';
import Line from 'features/canvasTools/line/Line';
import Rect from 'features/canvasTools/rect/Rect';

import { redoService } from 'features/canvasRedo/canvasRedo';
import { undoService } from 'features/canvasUndo/canvasUndo';

import { ToolState } from 'entities/Tool/model/state/ToolState';
import { SessionStore } from 'entities/Session/model/state/sessionStore';
import { CanvasState } from 'entities/Canvas/model/state/сanvasState';
import brushIcon from 'shared/assets/img/brush.png';
import rectIcon from 'shared/assets/img/rect.png';
import circleIcon from 'shared/assets/img/circle.png';
import eraserIcon from 'shared/assets/img/eraser.png';
import lineIcon from 'shared/assets/img/line.png';
import undoIcon from 'shared/assets/img/undo.png';
import redoIcon from 'shared/assets/img/redo.png';
import saveIcon from 'shared/assets/img/save.png';

type ToolbarItem =
    | {
          type: 'button';
          icon: string;
          className: ToolbarButtonClass;
          onClick: () => void;
      }
    | {
          type: 'input';
          inputType: 'color';
          onChange: (value: string) => void;
      };

export type ToolbarButtonClass =
    | 'brush'
    | 'rect'
    | 'circle'
    | 'eraser'
    | 'line'
    | 'undo'
    | 'redo'
    | 'save';

interface CreateToolbarConfigProps {
    canvasStore: CanvasState;
    toolStore: ToolState;
    sessionStore: SessionStore;
    download: () => void;
}

export const createToolbarConfig = ({
    canvasStore,
    toolStore,
    sessionStore,
    download,
}: CreateToolbarConfigProps): ToolbarItem[] => [
    {
        type: 'button',
        className: 'brush',
        icon: brushIcon,
        onClick: () =>
            toolStore.setTool(
                new Brush(
                    canvasStore.canvas,
                    sessionStore.socket,
                    sessionStore.sessionId,
                ),
            ),
    },

    {
        type: 'button',
        icon: rectIcon,
        className: 'rect',
        onClick: () =>
            toolStore.setTool(
                new Rect(
                    canvasStore.canvas,
                    sessionStore.socket,
                    sessionStore.sessionId,
                ),
            ),
    },

    {
        type: 'button',
        icon: circleIcon,
        className: 'circle',
        onClick: () =>
            toolStore.setTool(
                new Cirlce(
                    canvasStore.canvas,
                    sessionStore.socket,
                    sessionStore.sessionId,
                ),
            ),
    },

    {
        type: 'button',
        icon: eraserIcon,
        className: 'eraser',
        onClick: () =>
            toolStore.setTool(
                new Eraser(
                    canvasStore.canvas,
                    sessionStore.socket,
                    sessionStore.sessionId,
                ),
            ),
    },

    {
        type: 'button',
        icon: lineIcon,
        className: 'line',
        onClick: () =>
            toolStore.setTool(
                new Line(
                    canvasStore.canvas,
                    sessionStore.socket,
                    sessionStore.sessionId,
                ),
            ),
    },

    {
        type: 'input',
        inputType: 'color',
        onChange: (value) => toolStore.setFillColor(value),
    },

    {
        type: 'button',
        icon: undoIcon,
        className: 'undo',
        onClick: () =>
            undoService.undo(sessionStore.socket, sessionStore.sessionId),
    },

    {
        type: 'button',
        icon: redoIcon,
        className: 'redo',
        onClick: () => redoService.redo(),
    },

    {
        type: 'button',
        icon: saveIcon,
        className: 'save',
        onClick: download,
    },
];
