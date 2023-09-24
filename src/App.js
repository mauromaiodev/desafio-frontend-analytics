import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import ColorDisplay from "./components/ColorDisplay/ColorDisplay";
import ColorOption from "./components/ColorOptions/ColorOption";
import Container from "./components/Container/Container";
import GameControls from "./components/GameControls/GameControls";
import GameHistory from "./components/GameHistory/GameHistory";
import ResetButton from "./components/ResetButton/ResetButton";
import Sidebar from "./components/SideBar/SideBar";
import StartPanel from "./components/StartPanel/StartPanel";

function App() {
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("highScore")) || 0
  );
  const [currentScore, setCurrentScore] = useState(0);
  const [currentColor, setCurrentColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameHistory, setGameHistory] = useState(
    () => JSON.parse(localStorage.getItem("gameHistory")) || []
  );
  const [gameTimer, setGameTimer] = useState(30);
  const [selectedOption, setSelectedOption] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameStandby, setGameStandby] = useState(false);
  const [startPanelVisible, setStartPanelVisible] = useState(true);

  const startGame = () => {
    setGameInProgress(true);
    setGameStandby(false);
    startGameTimer();
    startRound();
    setStartPanelVisible(false);
  };

  const startGameTimer = useCallback(() => {
    setGameTimer(30);
    setGameOver(false);
  }, []);

  const restartGame = () => {
    startGameTimer();
    startRound();
  };

  const resetAllData = () => {
    setCurrentScore(0);
    setHighScore(0);
    setGameHistory([]);
    setGameInProgress(false);
    localStorage.removeItem("highScore");
    localStorage.removeItem("gameHistory");
  };

  const generateRandomColor = useCallback(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  const generateColorOptions = useCallback(
    (correctColor) => {
      const options = [];
      options.push(correctColor);
      while (options.length < 3) {
        const randomColor = generateRandomColor();
        if (!options.includes(randomColor)) {
          options.push(randomColor);
        }
      }
      return shuffleArray(options);
    },
    [generateRandomColor]
  );

  const startRound = useCallback(() => {
    const newColor = generateRandomColor();
    setCurrentColor(newColor);

    const options = generateColorOptions(newColor);
    setColorOptions(options);

    setSelectedOption("");
  }, [generateRandomColor, generateColorOptions]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleColorClick = (selectedColor) => {
    if (!gameOver && !gameStandby) {
      setSelectedOption(selectedColor);
      if (selectedColor === currentColor) {
        setCurrentScore(currentScore + 1);
      } else {
        setCurrentScore(currentScore - 1);
      }
      addToGameHistory(selectedColor === currentColor);
    }
  };

  const addToGameHistory = useCallback(
    (correct) => {
      const historyItem = {
        selectedOption,
        color: currentColor,
        correct,
        time: 30 - gameTimer + "s",
      };
      setGameHistory((prevHistory) => [historyItem, ...prevHistory]);

      if (gameTimer === 0) {
        setGameOver(true);
        setGameStandby(true);
      } else {
        startRound();
      }
    },
    [selectedOption, currentColor, gameTimer, startRound]
  );

  useEffect(() => {
    if (gameInProgress && gameTimer > 0) {
      const intervalId = setInterval(() => {
        setGameTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [gameTimer, gameInProgress]);

  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("highScore", currentScore.toString());
    }
  }, [currentScore, highScore]);

  useEffect(() => {
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  return (
    <div className="App">
      <Sidebar>
        <GameHistory gameHistory={gameHistory} />
      </Sidebar>
      <Container>
        <h1>Guess the color</h1>
        <div className="game-panel">
          <GameControls
            timer={gameTimer}
            onRestart={restartGame}
            highScore={highScore}
            currentScore={currentScore}
            gameInProgress={gameInProgress}
          />
        </div>
        <ColorDisplay currentColor={currentColor} />
        <div className="color-options">
          {colorOptions.map((option, index) => (
            <ColorOption
              key={index}
              option={option}
              selected={selectedOption === option}
              onClick={handleColorClick}
            />
          ))}
        </div>
        {startPanelVisible && <StartPanel startGame={startGame} />}
        <ResetButton resetAllData={resetAllData} />
      </Container>
    </div>
  );
}

export default App;
