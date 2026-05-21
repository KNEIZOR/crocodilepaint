import { makeAutoObservable } from 'mobx';

export class UserState {
    username = '';
    isModalOpen = true;

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
}
