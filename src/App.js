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
  const [highScore, setHighScore] = useState(() => {
    const storedHighScore = localStorage.getItem("highScore");
    return parseInt(storedHighScore) || 0;
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [currentColor, setCurrentColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameHistory, setGameHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("gameHistory")) || [];
  });
  const [gameTimer, setGameTimer] = useState(30);
  const [selectedOption, setSelectedOption] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameStandby, setGameStandby] = useState(false);
  const [startPanelVisible, setStartPanelVisible] = useState(true);

  const clearGameHistoryOnUnload = () => {
    localStorage.removeItem("gameHistory");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearGameHistoryOnUnload);
    return () => {
      window.removeEventListener("beforeunload", clearGameHistoryOnUnload);
    };
  }, []);

  const startGame = () => {
    setGameInProgress(true);
    setGameStandby(false);
    startGameTimer();
    startRound();
    setStartPanelVisible(false);
    setGameHistory([]);
  };

  const startGameTimer = useCallback(() => {
    setGameTimer(30);
    setGameOver(false);
  }, []);

  const restartGame = () => {
    setCurrentScore(0);
    startGameTimer();
    startRound();
    setGameOver(false);
    setGameStandby(false);
  };

  const resetAllData = () => {
    setCurrentScore(0);
    setHighScore(0);
    setGameHistory([]);
    setGameInProgress(false);
    setStartPanelVisible(true);
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

  const initializeCurrentColor = useCallback(() => {
    const newColor = generateRandomColor();
    setCurrentColor(newColor);
  }, [generateRandomColor]);

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
      recordGameHistory(selectedColor === currentColor);
    }
  };

  const recordGameHistory = useCallback(
    (correct) => {
      const historyItem = {
        selectedOption,
        color: currentColor,
        correct,
        time: `${30 - gameTimer}s`,
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
    initializeCurrentColor();
  }, [initializeCurrentColor]);

  useEffect(() => {
    if (gameInProgress && gameTimer > 0) {
      const intervalId = setInterval(() => {
        setGameTimer((prevTimer) => prevTimer - 1);

        if (gameTimer === 1) {
          setGameOver(true);
          setGameStandby(true);
        }
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
      <Sidebar className="sidebar">
        <GameHistory gameHistory={gameHistory} />
      </Sidebar>
      <Container title={"Guess the Color"}>
        <GameControls
          timer={gameTimer}
          onRestart={restartGame}
          highScore={highScore}
          currentScore={currentScore}
          gameInProgress={gameInProgress}
        />
        <ColorDisplay currentColor={currentColor} />
        <div className="color-options">
          {gameInProgress &&
            colorOptions.map((option, index) => (
              <ColorOption
                key={index}
                option={option}
                selected={selectedOption === option}
                onClick={handleColorClick}
                disabled={gameOver}
              />
            ))}
        </div>
        {startPanelVisible && <StartPanel startGame={startGame} />}
      </Container>
      <ResetButton resetAllData={resetAllData} />
    </div>
  );
}

export default App;
