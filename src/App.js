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
  const [timeSinceLastColorChange, setTimeSinceLastColorChange] = useState(0);
  const [totalCorrectCount, setTotalCorrectCount] = useState(0);

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
    setGameTimer(30);
    setGameInProgress(false);
    setStartPanelVisible(true);
    localStorage.removeItem("highScore");
    localStorage.removeItem("gameHistory");
  };

  const generateRandomColor = useCallback(
    () =>
      `#${((Math.random() * 0xffffff) | 0)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()}`,
    []
  );

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
      return sortArray(options);
    },
    [generateRandomColor]
  );

  const changeColor = useCallback(() => {
    const newColor = generateRandomColor();
    setCurrentColor(newColor);

    const options = generateColorOptions(newColor);
    setColorOptions(options);
    setTimeSinceLastColorChange(0);
  }, [generateRandomColor, generateColorOptions]);

  const startRound = useCallback(() => {
    const newColor = generateRandomColor();
    setCurrentColor(newColor);

    const options = generateColorOptions(newColor);
    setColorOptions(options);

    setSelectedOption("");
  }, [generateRandomColor, generateColorOptions]);

  const sortArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleColorClick = (selectedColor) => {
    if (!gameOver && !gameStandby) {
      if (selectedColor === currentColor) {
        setCurrentScore(currentScore + 5);
        setTotalCorrectCount(totalCorrectCount + 1);

        if (totalCorrectCount + 1 === 3) {
          setGameOver(true);
        }
      } else {
        setCurrentScore(currentScore - 1);
      }
      recordGameHistory(selectedColor, selectedColor === currentColor);
      setSelectedOption(selectedColor);
    }
  };

  const recordGameHistory = useCallback(
    (selectedColor, correct) => {
      if (correct) {
        const historyItem = {
          selectedOption: selectedColor,
          color: currentColor,
          correct,
          time: `${30 - gameTimer}s`,
        };

        setGameHistory((prevHistory) => [historyItem, ...prevHistory]);

        setCurrentColor(generateRandomColor());
        startRound();
      } else {
        const wrongColor = selectedColor;
        const historyItemWrong = {
          selectedOption: selectedColor,
          color: wrongColor,
          correct: false,
          time: `${30 - gameTimer}s`,
        };
        setGameHistory((prevHistory) => [historyItemWrong, ...prevHistory]);

        if (gameTimer === 0) {
          setGameOver(true);
          setGameStandby(true);
        }
      }
    },
    [gameTimer, currentColor, startRound, generateRandomColor]
  );

  useEffect(() => {
    initializeCurrentColor();
  }, [initializeCurrentColor]);

  useEffect(() => {
    let intervalId;

    if (gameInProgress && gameTimer > 0) {
      intervalId = setInterval(() => {
        setGameTimer((prevTimer) => prevTimer - 1);
        setTimeSinceLastColorChange((prevTime) => prevTime + 1);

        if (gameTimer === 1) {
          setGameOver(true);
          setGameStandby(true);
        }

        if (gameTimer > 9 && timeSinceLastColorChange === 9) {
          changeColor();
        }
      }, 1000);
    }

    if (gameOver) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [
    gameTimer,
    gameInProgress,
    timeSinceLastColorChange,
    changeColor,
    gameOver,
  ]);

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
        <div className="container-child">
          <GameControls
            timer={gameTimer}
            onRestart={restartGame}
            highScore={highScore}
            currentScore={currentScore}
            gameInProgress={gameInProgress}
          />
          <ColorDisplay currentColor={currentColor} />
          <div className="color-options-container">
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
        </div>
      </Container>
      <ResetButton resetAllData={resetAllData} />
    </div>
  );
}

export default App;
