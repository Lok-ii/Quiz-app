import React, { useEffect, useState } from "react";
import "./App.css";
import Question from "./Components/Question/Question";

function App() {
  const [questionArray, setQuestionArray] = useState([]);
  const [time, setTime] = useState(20);
  const [questionNumber, setNumber] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [backgroundC, setBackground] = useState(`linear-gradient(
    to top,
    rgb(162, 171, 88, 0.7),
    rgb(99, 99, 99,0.7)
  )`)

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

  useEffect(()=>{
    if(disabled){
      setBackground(`linear-gradient(
        to top,
        rgb(162, 171, 88, 0.3),
        rgb(99, 99, 99, 0.2)
      )`);
    }else{
      setBackground(`linear-gradient(
        to top,
        rgb(162, 171, 88, 0.7),
        rgb(99, 99, 99,0.7)
      )`);
    }
  })

  return (
    <>
      {questionNumber <= 10 ? (
        <div className="App">
          <h1 className="heading">Quiz App </h1>
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
                    back={backgroundC}
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
          <p className="score">Your Score: {correctCount} / 10</p>
        </div>
      )}
    </>
  );
}

export default App;
