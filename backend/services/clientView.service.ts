import type { game } from '../types';

/**================================================================================================
 *                                         EMITER METHODS
 *================================================================================================**/
/*
export function updateClientsViewTimers(game: game): void {
  game.player1Socket.emit(
    'game.timer',
    GameService.send.forPlayer.gameTimer('player:1', game.gameState)
  );
  game.player2Socket.emit(
    'game.timer',
    GameService.send.forPlayer.gameTimer('player:2', game.gameState)
  );
}
*/
/*
export function updateClientsViewDecks(game): void {
  setTimeout(() => {
    game.player1Socket.emit(
      'game.deck.view-state',
      GameService.send.forPlayer.deckViewState('player:1', game.gameState)
    );
    game.player2Socket.emit(
      'game.deck.view-state',
      GameService.send.forPlayer.deckViewState('player:2', game.gameState)
    );
  }, 200);
}

 */

export function updateClientsViewChoices(game): void {
  setTimeout(() => {
    game.player1Socket.emit(
      'game.choices.view-state',
      GameService.send.forPlayer.choicesViewState('player:1', game.gameState)
    );
    game.player2Socket.emit(
      'game.choices.view-state',
      GameService.send.forPlayer.choicesViewState('player:2', game.gameState)
    );
  }, 200);
}

export function updateClientsViewGrid(game): void {
  setTimeout(() => {
    game.player1Socket.emit(
      'game.grid.view-state',
      GameService.send.forPlayer.gridViewState('player:1', game.gameState)
    );
    game.player2Socket.emit(
      'game.grid.view-state',
      GameService.send.forPlayer.gridViewState('player:2', game.gameState)
    );
  }, 200);
}
