import { SessionStore } from 'entities/Session/model/state/sessionStore';
import { CanvasHistory } from 'entities/Canvas/model/state/canvasHistory';
import { CanvasState } from 'entities/Canvas/model/state/сanvasState';
import { ToolState } from 'entities/Tool/model/state/ToolState';
import { UserState } from 'entities/User/model/state/userState';

class RootStore {
    readonly canvasStore: CanvasState;
    readonly historyStore: CanvasHistory;

    readonly userStore: UserState;

    readonly sessionStore: SessionStore;

    readonly toolStore: ToolState;

    constructor() {
        this.canvasStore = new CanvasState();

        this.historyStore = new CanvasHistory();

        this.userStore = new UserState();

        this.sessionStore = new SessionStore();

        this.toolStore = new ToolState();
    }
}

export const rootStore: RootStore = new RootStore();
