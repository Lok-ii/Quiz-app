import React, { useEffect, useState } from "react";
import "./App.css";
import Question from "./Components/Question/Question";

function App() {
  const [questionArray, setQuestionArray] = useState([]);
  const [time, setTime] = useState(20);
  const [questionNumber, setNumber] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = "https://opentdb.com/api.php?amount=10&type=multiple";
      try {
        const response = await fetch(url);
        const result = await response.json();
        setQuestionArray(result.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(timer);
      setDisabled(true);
    }
    return () => {
      // Cleanup function to clear the interval when the component unmounts
      clearInterval(timer);
    };
  }, [time]);

  return (
    <>
      {questionNumber <= 10 ? (
        <div className="App">
          <h1 className="heading">Quiz App</h1>
          <div className="questionContainer">
            {questionArray.map((item, idx) => {
              if (idx === questionNumber - 1) {
                return (
                  <Question
                    key={idx}
                    number={questionNumber}
                    question={item}
                    setNumber={setNumber}
                    setDisabled={setDisabled}
                    disabled={disabled}
                    count={correctCount}
                    setCorrectCount={setCorrectCount}
                    setTime={setTime}
                  />
                );
              }
            })}
          </div>
          <p className="timeLeft">Time left: {time} seconds</p>
          <div className="buttons">
            <button
              className="skipBtn"
              onClick={() => {
                setNumber((prev) => prev + 1);
                setTime(20);
                setDisabled(false);
              }}
            >
              Skip Question
            </button>
          </div>
        </div>
      ) : (
        <div className="quizEnded">
          <p className="endHeading">Quiz Ended</p>
          <p className="score">{correctCount} / 10</p>
        </div>
      )}
    </>
  );
}

export default App;
