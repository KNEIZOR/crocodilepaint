import { makeAutoObservable } from "mobx"

export class SessionStore {
    socket: WebSocket | null = null
    sessionId: string | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setSoket(socket: WebSocket) {
        this.socket = socket
    }

    setSessionId(id: string) {
        this.sessionId = id
    }
}