import {type DisconnectReason, type Socket, Server} from 'socket.io';

function disconnect(io: Server, reason: DisconnectReason): void {
    const socket = io as Socket;

    console.log(`[${socket.id}] player disconnected : ${reason}`)
    //TODO write disconnect
}

export { disconnect };