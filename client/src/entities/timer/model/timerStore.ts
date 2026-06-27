import { makeAutoObservable } from "mobx";

class TimerStore {
    time = 10;
    interval: ReturnType<typeof setInterval> | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    start(initial = 10) {
        this.time = initial;

        this.interval = setInterval(() => {
            if (this.time <= 1) {
                this.stop();
                this.time = 0;
                return;
            }
            this.time -= 1;
        }, 1000);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

export const timerStore = new TimerStore();
