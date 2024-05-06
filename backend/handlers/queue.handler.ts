import { Server, Socket } from 'socket.io';
import {createGame, GameService} from '../services/game.service';
import {Queue} from "../classes/queue.class.ts";
import type {Player} from "../classes/player.class.ts";

function queueJoin(queue: Queue<Player>, player: Player): Array<Player> | void {

    console.log(`[${player.socket.id}] new player in the queue`)

    queue.addElementToQueue(player);

    if (queue.elements.length >= 2) {
        return [queue.removeFirstElementFromQueue(), queue.removeFirstElementFromQueue()]
    }

    player.socket.emit('queue.added', player.getQueueState());

    return undefined;
}
//TODO remove?
/*
export function newPlayerInQueue(socket: Socket, queue: Queue) {
    queue.push(socket);

    // 'queue' management
    if (queue.length >= 2) {
        const player1Socket = queue.shift();
        const player2Socket = queue.shift();

        if (player1Socket === undefined || player2Socket === undefined) {
            throw new Error('No sockets in queue');

        }

        createGame(player1Socket, player2Socket);

    } else {
        socket.emit('queue.added', GameService.send.forPlayer.viewQueueState());
    }
}
*/
export { queueJoin };

