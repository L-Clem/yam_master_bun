import type {Game} from "./game.class.ts";

class View {
    public static updateClientsViewTimers(game: Game) {
        game.playerOne.socket.emit('game.timer', game.getPlayerTurnTimers(game.playerOne));
        game.playerTwo.socket.emit('game.timer', game.getPlayerTurnTimers(game.playerTwo));
    }
    public static updateClientsViewChoices(game: Game) {
        setTimeout(()=> {
            game.playerOne.socket.emit('game.choices.view-state', game.playerOne.getChoicesState());
            game.playerTwo.socket.emit('game.choices.view-state', game.playerTwo.getChoicesState());
        }, 200);
    }
    public static updateClientsViewGrid(game: Game) {
        setTimeout(()=> {
            game.playerOne.socket.emit('game.grid.view-state', game.playerOne.getGridState());
            game.playerTwo.socket.emit('game.grid.view-state', game.playerTwo.getGridState());
        }, 200);
    }
    public static updateClientsViewDecks(game: Game) {
        setTimeout(()=> {
            game.playerOne.socket.emit('game.deck.view-state', game.playerOne.getDeckState());
            game.playerTwo.socket.emit('game.deck.view-state', game.playerTwo.getDeckState());
        }, 200);
    }
    public static viewGameState(game: Game) {
        game.playerOne.socket.emit('game.start', game.playerOne.getGameState());
        game.playerTwo.socket.emit('game.start', game.playerTwo.getGameState());
    }
}

export { View };