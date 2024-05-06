// Import libraries
import * as express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import uniqid from 'uniqid';

// Import local modules/files
import type { game } from './types';
import { queueJoin } from "./handlers/queue.handler";
import { disconnect } from "./handlers/disconnect.handler";
import { GameService } from "./services/game.service";
import {Queue} from "./classes/queue.class.ts";
import { Player } from "./classes/player.class.ts";
import {Game} from "./classes/game.class.ts";
import {View} from "./classes/view.staticClass.ts";

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
let gamesQueue: Queue<Game> = new Queue<Game>();
let playersQueue = new Queue<Player>();


const createGame = (player1Socket, player2Socket) => {

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
  let player: Player = new Player(socket);

  console.log(`[${socket.id}] socket connected, player created`);

  socket.on('queue.join', () => {
    let result: Array<Player> | void = queueJoin(playersQueue, player);
    if (result === undefined) {
      return;
    }
    let game: Game = new Game(result[0], result[1], 30);
    gamesQueue.addElementToQueue(game)

    View.viewGameState(game);
    View.updateClientsViewTimers(game);
    View.updateClientsViewDecks(game);
    View.updateClientsViewGrid(game);


    game.timer.executeAtInterval((game: Game) => {

      View.updateClientsViewTimers(game);

      if (game.timer.currentTime === 0) {

        game.timer.resetTime();

        game.currentTurn.currentPlayer.deck.setDefaultDeck();
        game.currentTurn.setDefaultChoices();
        game.grid.resetCellsState();

        game.switchTurn();

        View.updateClientsViewTimers(game);
        View.updateClientsViewDecks(game);
        View.updateClientsViewChoices(game);
        View.updateClientsViewGrid(game);
      }
    }, 1000)

    game.playerOne.socket.on('disconnect', () => {
      game.timer.clearAtInterval();
    })
    game.playerTwo.socket.on('disconnect', () => {
      game.timer.clearAtInterval();
    })
  });

  socket.on('game.dices.roll', () => {
    let game = gamesQueue.elements.find((game) => {
          game.playerInGame(socket.id)
        });
    if (game === undefined){
      return;
    }

    if (game.currentTurn.currentPlayer.deck.rollsCounter < game.currentTurn.currentPlayer.deck.rollsMaximum) {
      game.currentTurn.currentPlayer.deck.rollDices();
    } else {
      game.currentTurn.currentPlayer.deck.rollDices();
      game.currentTurn.currentPlayer.deck.lockDices();
    }
  });


  socket.on('game.dices.lock', gameDicesLock);
  socket.on('game.choices.selected', gameChoicesSelected);
  socket.on('game.grid.selected', gameGridSelected);
  socket.on('disconnect', disconnect); //TODO where to place the disconnect?

  
  

  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});


/**================================================================================================
 *                                         WEB SERVER
 *================================================================================================**/

httpServer.listen(3000, () => {
  console.log('Web server and websocket listening on *:3000');
});
