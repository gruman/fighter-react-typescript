import React, { useState } from 'react';

// Define the Fighter interface with required properties
interface Fighter {
  id: string;
  name: string;
  hp: number;
  atk: number;
}
// List of names for fighters
const names: string[] = ["Alex", "Petunia", "Jacob", "Leslie"];

// Function to get a random name from the list
const getRandomName = () => names[Math.floor(Math.random() * 4) + 0];

const FightingGame = () => {
  // Function to initialize a fighter with random values
  const initializeFighter = (): Fighter => ({
    id: Math.floor(Math.random() * 9999999) + 1, // random
    name: getRandomName(), // random
    hp: Math.floor(Math.random() * 5) + 1, // random
    atk: Math.floor(Math.random() * 6) + 10 // random
  });

  // State for storing the players (fighters)
  const [players, setPlayers] = useState<Fighter[]>([
    initializeFighter(),
    initializeFighter(),
  ]);

  // State to track the current player's index
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

  // Get the current player and the other player
  const currentPlayer: Fighter = players[currentPlayerIndex];
  const otherPlayerIndex: number = (currentPlayerIndex + 1) % 2;
  const otherPlayer: Fighter = players[otherPlayerIndex];

  // Function to switch turns between players
  const switchTurn = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  // Function to handle the fight action
  const handleFight = () => {
    const attacker: Fighter = currentPlayer;
    const defender: Fighter = otherPlayer;
    let damage = attacker.atk;
    if (damage < 1) damage = 1;

    // Log the fight action
    console.log(attacker.name + ' attacks ' + defender.name + ' for ' + damage + ' damage!');
    defender.hp -= damage;

    // Check if the defender's HP is zero or less
    if (defender.hp <= 0) {
      // Log the defeat message and reset the players
      console.log(defender.name + ' has been defeated! ' + attacker.name + ' wins!');
      setPlayers([
        initializeFighter(),
        initializeFighter(),
      ]);
    } else {
      // Switch to the other player's turn
      switchTurn();
    }
  };

  // Function to handle the pass action
  const handlePass = () => {
    // Switch to the other player's turn
    switchTurn();
  };

  // Function to handle the reset action
  const handleReset = () => {
    // Reset the players and set the current player to the first player
    setPlayers([
      initializeFighter(),
      initializeFighter(),
    ]);
    setCurrentPlayerIndex(0);
  };

  // JSX structure for the FightingGame component
  return (
    <div>
      <h1>Fighting Game</h1>
      <div>
        <h2>{currentPlayer.name}'s Turn</h2>
        {/* Buttons for actions */}
        <button onClick={handleFight}>Fight</button>
        <button onClick={handlePass}>Pass</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        {/* Display player information */}
        {players.map((player) => (
          <div key={player.id}>
            <h2>{player.name}</h2>
            <p>HP: {player.hp}</p>
            <p>ATK: {player.atk}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the FightingGame component
export default FightingGame;
