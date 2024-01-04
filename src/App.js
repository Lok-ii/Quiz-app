import React, { useEffect, useState } from "react";
import "./App.css";
import Question from "./Components/Question/Question";

function App() {
  const [questionArray, setQuestionArray] = useState([]);
  const [time, setTime] = useState(10);
  const [questionNumber, setNumber] = useState(1);
  const [disabled, setDisabled] = useState(false);

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
    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time === 0) {
      clearTimeout(timer);
      setDisabled(true);
    }
  }, [time]);

  return (
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
            setTime(10);
            setDisabled(false);
          }}
        >
          Skip Question
        </button>
      </div>
    </div>
  );
}

export default App;
