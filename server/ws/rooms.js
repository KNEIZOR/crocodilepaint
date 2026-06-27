const rooms = {};

module.exports = {
    getRoom(id) {
        return rooms[id];
    },

    createRoom(id, maxPlayers) {
        rooms[id] = {
            clients: [],
            maxPlayers,
            winner: null
        };
        return rooms[id];
    },

    deleteRoom(id) {
        delete rooms[id];
    }
};
