export class CanvasHistory {
    undoList: string[] = [];
    redoList: string[] = [];

    pushToUndo(data: string) {
        this.undoList.push(data);
    }

    pushToRedo(data: string) {
        this.redoList.push(data);
    }

    popToUndo() {
        return this.undoList.pop();
    }

    popToRedo() {
        return this.redoList.pop()
    }
}

