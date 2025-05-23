import { useState, useEffect, useRef } from "react";
import {
  MainContainer,
  DisplayPanelContainer,
  DisplayPanel,
  Title,
  SubTitle,
  Description,
  Button,
  TargetsContainer,
  TargetsSubContainer,
  ScoresContainer,
  Header,
  TargetsHeaderContainer,
  GameContainer,
  GameBackgroundImage,
  GameGuessClick,
  GameGuessForm,
  GameGuessFormSubContainer,
  GameGuessCircle,
  Footer,
  FooterTitle,
  Form,
  Input,
  LoadingCircle
} from "./Game.styles.js";

function Game() {
  const [isLoading, setIsLoading] = useState(false);
  const [highScores, setHighScores] = useState(false);
  const [highScoresList, setHighScoresList] = useState([]);
  const [targetsList, setTargetsList] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [guessMessage, setGuessMessage] = useState('Make a guess.');
  const [imageClicked, setImageClicked] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [clickXPercent, setClickXPercent] = useState(0);
  const [clickYPercent, setClickYPercent] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [nameError, setNameError] = useState(false);
  const gameContainerRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchScores = async () => {
    try {
      const response = await fetch(`${apiUrl}/game/scores`, {
        method: "GET"
      });
  
      const data = await response.json();
      if (response.ok) setHighScoresList(data);

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const fetchTargets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/game`, {
        method: "GET"
      });
  
      const data = await response.json();

      if (response.ok) { 
        setIsLoading(false);
        setTargetsList(data);
      }

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const fetchGuess = async (name, x, y) => {
    try {
      const response = await fetch(`${apiUrl}/game/guess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, x, y }),
      });

      const data = await response.json();
      if (response.ok) return data;

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const savePlayerScore = async (name, score) => {
    try {
      const response = await fetch(`${apiUrl}/game/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
      });

      const data = await response.json();
      if (response.ok) return data;

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const handleViewHighscoresClick = () => {
    setHighScores(!highScores);
    if (!highScores) fetchScores();
  };

  const handleStartGameClick = () => { 
    setGameStarted(true);
  };

  const handleImageClick = (event) => {
    setImageClicked(!imageClicked);
    getClickCoordinates(event);
  };

  const handleGuessSubmit = async (name, x, y) => {
    try {
      setIsLoading(true);
      setGuessMessage("Loading...");
      const answer = await fetchGuess(name, x, y);
  
      if (answer.isCorrect) {
        setCorrectGuesses((prev) => prev + 1);
        setTargetsList((prevTargets) =>
          prevTargets.map((target) =>
            target.name === name ? { ...target, guessed: true } : target
          )
        );
        displayMessage("Target found!", 4000);
      } else {
        displayMessage("Wrong. Try again...", 5000);
      }

    } catch (error) {
      displayMessage("Bad servers right now...", 7000);
      console.log("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (playerName.length < 1 || playerName.length > 6) {
      setNameError(true);
      return;
    }

    try {
      savePlayerScore(playerName, score);
      alert("Your score has been submitted!");
      resetGame();
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };

  const displayMessage = (message, duration) => {
    setGuessMessage(message);
  
    setTimeout(() => {
      setGuessMessage("Make a guess...");
    }, duration);
  };
  
  const getClickCoordinates = (event) => {
    const rect = event.target.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top; // to account for the header

    const width = rect.width;
    const height = rect.height;

    setClickX(x);
    setClickY(y);

    // Convert the coordinates into percentages to be used on the API
    setClickXPercent((x / width) * 100);
    setClickYPercent((y / height) * 100);

    // Alert percentage coordinates for debugging
    alert(`X: ${clickXPercent}, Y: ${clickYPercent}`);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setCorrectGuesses(0);
    setPlayerName('');
    setScore(0);
    setNameError(false);
  };

  useEffect(() => {
    let interval;
    if (gameStarted && !gameEnded) {
      interval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [gameStarted, gameEnded]);

  useEffect(() => {
    if (correctGuesses === 3) { 
      setGameEnded(true);
      setGameStarted(false);
    }
  }, [correctGuesses]);

  useEffect(() => {
    if (!gameEnded) fetchTargets();
  }, [gameEnded]);

  return (
    <MainContainer>
      <Header isVisible={gameStarted}>
        <TargetsHeaderContainer>
          {targetsList.map((target, index) => (
            <TargetsSubContainer key={index} guessed={target.guessed}>
              <GameGuessCircle src={target.image} />
              <Description>{target.name}</Description>
            </TargetsSubContainer>
          ))}
        </TargetsHeaderContainer>
      </Header>

      {!gameStarted && !gameEnded &&(
        <DisplayPanelContainer>
          <DisplayPanel>
            {!highScores ? (
              <>
                <Title>Spot-It</Title>
                <Description>
                  Find the heroes below... The faster you do it, the higher you will rank.
                </Description>
                <TargetsContainer>
                  {isLoading ? (
                    <TargetsSubContainer>
                      <LoadingCircle />
                      <Description>Loading...</Description>
                    </TargetsSubContainer>
                  ) : (
                    <>
                      {targetsList.map((target, index) => (
                        <TargetsSubContainer key={index}>
                          <GameGuessCircle key={index} src={target.image} />
                          <Description>{target.name}</Description>
                        </TargetsSubContainer>
                      ))}
                    </>
                  )}
                </TargetsContainer>
                <Button disabled={isLoading} onClick={handleStartGameClick}>Start Game</Button>
                <Button onClick={handleViewHighscoresClick}>High Scores</Button>
                {isLoading && (
                  <Description>
                    Try refreshing if it takes too long...
                  </Description>
                )}
              </>
            ) : (
              <>
                <Title>Spot-It</Title>
                <SubTitle>Top 5 Fastest Players</SubTitle>
                <ScoresContainer>
                  {isLoading ? (
                    <TargetsSubContainer>
                      <LoadingCircle />
                      <Description>Loading...</Description>
                    </TargetsSubContainer>
                  ) : (
                    <>
                      {highScoresList.length > 0 ? (
                        highScoresList.map((score, index) => (
                          <Description key={index}>
                            {score.name} - {score.score}
                          </Description>
                        ))
                      ) : (
                        <Description>No high scores available</Description>
                      )}
                    </>
                  )}
                </ScoresContainer>
                <Button onClick={handleViewHighscoresClick}>Return</Button>
              </>
            )}
          </DisplayPanel>
          <GameBackgroundImage src="/assets/images/marvel-background.jpg" isBlurred={gameStarted}/>
        </DisplayPanelContainer>
      )}

      {gameEnded && (
        <DisplayPanelContainer>
          <DisplayPanel>
            <Title>Hidden Heroes</Title>
            <SubTitle>Congrats! You beat the game in {score} seconds.</SubTitle>
            <Description>Good job! Write your name to submit your score:</Description>
            {nameError && (<Description>Your name must be between 1 to 8 characters!</Description>)}
            <Form onSubmit={handleFormSubmit}>
              <Input
                type="text"
                value={playerName}
                onChange={handleInputChange}
                placeholder="1-6 chars"
              />
              <Button type="submit" disabled={!playerName.trim()}>
                Submit
              </Button>
            </Form>
          </DisplayPanel>
          <GameBackgroundImage src="/assets/images/marvel-background.jpg" isBlurred={true}/>
        </DisplayPanelContainer>
      )}

      {gameStarted && !gameEnded &&(
        <GameContainer ref={gameContainerRef}>
          {imageClicked && (
            <>
              <GameGuessClick x={clickX} y={clickY} />
              <GameGuessForm x={clickX} y={clickY}>
                <Description>Which target have you found?</Description>
                {targetsList.map((target, index) => (
                  <GameGuessFormSubContainer
                    key={index}
                    guessed={target.guessed}
                    onClick={() =>
                      !target.guessed && handleGuessSubmit(target.name, clickXPercent, clickYPercent)
                    }
                  >
                    <TargetsSubContainer key={index}>
                      <GameGuessCircle src={target.image} />
                      <Description>{target.name}</Description>
                    </TargetsSubContainer>
                  </GameGuessFormSubContainer>
                ))}
                <Description>{guessMessage}</Description>
              </GameGuessForm>
            </>
          )}

          <GameBackgroundImage 
            src="/assets/images/marvel-background.jpg" 
            isBlurred={gameStarted} 
            onClick={handleImageClick} 
            alt="" 
          />

          <Footer>
            <FooterTitle>Spot-It</FooterTitle>
          </Footer>
        </GameContainer>
      )}
    </MainContainer>
  );
}

export default Game;