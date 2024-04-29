import { Server, Socket } from 'socket.io';
import { newPlayerInQueue } from '../services/game.service';

function queueJoin(io: Server): void {
    const socket = this;

    console.log(`[${socket.id}] new player in queue `)
    newPlayerInQueue(socket);
    //TODO add queue to func
}

export { queueJoin };