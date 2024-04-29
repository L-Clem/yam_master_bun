
function gameDicesRoll() {

}

function gameDicesLock() {

}

function gameDicesSelected() {

}

socket.on('game.dices.roll', () => {

    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);

    // if not last throw
    if (games[gameIndex].gameState.deck.rollsCounter < games[gameIndex].gameState.deck.rollsMaximum) {

        // dices management
        games[gameIndex].gameState.deck.dices = GameService.dices.roll(games[gameIndex].gameState.deck.dices);
        games[gameIndex].gameState.deck.rollsCounter++;

    }
    // if last throw
    else {

        // dices management 
        games[gameIndex].gameState.deck.dices = GameService.dices.roll(games[gameIndex].gameState.deck.dices);
        games[gameIndex].gameState.deck.rollsCounter++;
        games[gameIndex].gameState.deck.dices = GameService.dices.lockEveryDice(games[gameIndex].gameState.deck.dices);

        // temporary put timer at 5 sec to test turn switching 
        games[gameIndex].gameState.timer = 5;
    }

    // combinations management
    const dices = games[gameIndex].gameState.deck.dices;
    const isDefi = false;
    const isSec = games[gameIndex].gameState.deck.rollsCounter === 2;

    const combinations = GameService.choices.findCombinations(dices, isDefi, isSec);
    games[gameIndex].gameState.choices.availableChoices = combinations;


    // emit to views new state
    updateClientsViewDecks(games[gameIndex]);
    updateClientsViewChoices(games[gameIndex]);
});

socket.on('game.dices.lock', (idDice) => {

    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);
    const indexDice = GameService.utils.findDiceIndexByDiceId(games[gameIndex].gameState.deck.dices, idDice);

    // reverse flag 'locked'
    games[gameIndex].gameState.deck.dices[indexDice].locked = !games[gameIndex].gameState.deck.dices[indexDice].locked;

    updateClientsViewDecks(games[gameIndex]);
});

socket.on('game.choices.selected', (data) => {

    // gestion des choix
    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);
    games[gameIndex].gameState.choices.idSelectedChoice = data.choiceId;

    // gestion de la grid
    games[gameIndex].gameState.grid = GameService.grid.resetcanBeCheckedCells(games[gameIndex].gameState.grid);
    games[gameIndex].gameState.grid = GameService.grid.updateGridAfterSelectingChoice(data.choiceId, games[gameIndex].gameState.grid);

    updateClientsViewChoices(games[gameIndex]);
    updateClientsViewGrid(games[gameIndex]);
});

socket.on('game.grid.selected', (data) => {

    const gameIndex = GameService.utils.findGameIndexBySocketId(games, socket.id);

    games[gameIndex].gameState.grid = GameService.grid.resetcanBeCheckedCells(games[gameIndex].gameState.grid);
    games[gameIndex].gameState.grid = GameService.grid.selectCell(data.cellId, data.rowIndex, data.cellIndex, games[gameIndex].gameState.currentTurn, games[gameIndex].gameState.grid);

    // Here calcul score

    games[gameIndex].gameState.currentTurn = games[gameIndex].gameState.currentTurn === 'player:1' ? 'player:2' : 'player:1';
    games[gameIndex].gameState.timer = GameService.timer.getTurnDuration();

    games[gameIndex].gameState.deck = GameService.init.deck();
    games[gameIndex].gameState.choices = GameService.init.choices();

    games[gameIndex].player1Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:1', games[gameIndex].gameState));
    games[gameIndex].player2Socket.emit('game.timer', GameService.send.forPlayer.gameTimer('player:2', games[gameIndex].gameState));

    updateClientsViewDecks(games[gameIndex]);
    updateClientsViewChoices(games[gameIndex]);
    updateClientsViewGrid(games[gameIndex]);
});