// Import libraries
import * as express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import uniqid from 'uniqid';
// Import local modules/files
import type { game, queue } from './types';
import { queueJoin } from "./handlers/queue.handler";
import { GameService, newPlayerInQueue } from "./services/game.service";

/**================================================================================================
 *                                         CREATE SOCKET.IO SERVER
 *================================================================================================**/

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

/**================================================================================================
 *                                         CONSTANTS AND GLOBAL VARIABLES
 *================================================================================================**/

const isDev: boolean = process.env.ENVIRONMENT == "dev" ? true : false as const
let games: Array<game> = [];
let queue: Array<Socket> = [];


function createGame(player1Socket, player2Socket) {

}

const createGame = (player1Socket, player2Socket) => {

  // init objet (game) with this first level of structure:
  // - gameState : { .. evolutive object .. }
  // - idGame : just in case ;)
  // - player1Socket: socket instance key "joueur:1"
  // - player2Socket: socket instance key "joueur:2"
  const newGame = GameService.init.gameState();
  newGame['idGame'] = uniqid();
  newGame['player1Socket'] = player1Socket;
  newGame['player2Socket'] = player2Socket;

  // push game into 'games' global array
  games.push(newGame);

  const gameIndex = GameService.utils.findGameIndexById(games, newGame.idGame);

  // just notifying screens that game is starting
  games[gameIndex].player1Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:1', games[gameIndex]));
  games[gameIndex].player2Socket.emit('game.start', GameService.send.forPlayer.viewGameState('player:2', games[gameIndex]));

  // we update views
  updateClientsViewTimers(games[gameIndex]);
  updateClientsViewDecks(games[gameIndex]);
  updateClientsViewGrid(games[gameIndex]);

  // timer every second
  const gameInterval = setInterval(() => {

    // timer variable decreased
    games[gameIndex].gameState.timer--;

    // emit timer to both clients every seconds
    updateClientsViewTimers(games[gameIndex]);

    // if timer is down to 0, we end turn
    if (games[gameIndex].gameState.timer === 0) {

      // switch currentTurn variable
      games[gameIndex].gameState.currentTurn = games[gameIndex].gameState.currentTurn === 'player:1' ? 'player:2' : 'player:1';
      
      // reset timer
      games[gameIndex].gameState.timer = GameService.timer.getTurnDuration();

      // reset deck / choices / grid states
      games[gameIndex].gameState.deck = GameService.init.deck();
      games[gameIndex].gameState.choices = GameService.init.choices();
      games[gameIndex].gameState.grid = GameService.grid.resetcanBeCheckedCells(games[gameIndex].gameState.grid);

      // reset views also
      updateClientsViewTimers(games[gameIndex]);
      updateClientsViewDecks(games[gameIndex]);
      updateClientsViewChoices(games[gameIndex]);
      updateClientsViewGrid(games[gameIndex]);
    }

  }, 1000);

  // remove intervals at deconnection
  player1Socket.on('disconnect', () => {
    clearInterval(gameInterval);
  });

  player2Socket.on('disconnect', () => {
    clearInterval(gameInterval);
  });

};


/**================================================================================================
 *                                         SOCKET.IO MANAGEMENT
 *================================================================================================**/

io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);

  socket.on('queue.join', queueJoin);
  socket.on('game.dices.roll', gameDiceRoll);
  socket.on('game.dices.lock', gameDicesLock);
  socket.on('game.choices.selected', gameChoicesSelected);
  socket.on('game.grid.selected', gameGridSelected);
  socket.on('disconnect', disconnect);

  
  

  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});


/**================================================================================================
 *                                         WEB SERVER
 *================================================================================================**/

httpServer.listen(3000, function () {
  console.log('Web server and websocket listening on *:3000');
});
