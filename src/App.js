import "./styles.css";
import React, { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollcount, setRollCount] = useState(0);
  const [starttime, setStartTime] = useState(null);
  const [elapsedtime, setElapsedTime] = useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
    if (starttime) {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - starttime);
      }, 1000); //update every seconds
      // Clean up function to clear the interval when the component is unmounted
      return () => clearInterval(interval);
    }
  }, [dice, starttime]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setRollCount((prevRoll) => prevRoll + 1);
      if (rollcount === 0) {
        // Corrected condition
        setStartTime(Date.now());
      }
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0); // Reset roll count
      setStartTime(null);
      setElapsedTime(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    if (starttime === null) {
      setStartTime(Date.now());
    }
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <p className="elapsed-time">
        Elapsed time: {Math.round(elapsedtime / 1000)} seconds
      </p>
      <p className="roll-count">Roll count: {rollcount}</p>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
