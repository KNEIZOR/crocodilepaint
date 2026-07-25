import { makeAutoObservable } from 'mobx';

export class UserState {
    username = '';
    isModalOpen = true;
    isReady = true;
    startTimer = false;
    winner = ''
    wordWinner = ''

    constructor() {
        makeAutoObservable(this);
    }

    setUsername(username: string) {
        this.username = username;
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    setIsReady(ready: boolean) {
        this.isReady = ready;
    }

    setStartTimer(start: boolean) {
        this.startTimer = start;
    }

    setWinner(winner: string) {
        this.winner = winner
    }

    setWordWinner(word: string) {
        this.wordWinner = word
    }
}
