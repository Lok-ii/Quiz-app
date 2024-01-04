import React, { useState, useEffect } from "react";
import "./question.css";

const decodeHtmlEntities = (htmlString) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = htmlString;
  return textarea.value;
};

const Question = (props) => {
  const [optionsArray, setOptions] = useState([]);

  useEffect(() => {
    setOptions(() => {
      let optTemp = props.question["incorrect_answers"].map((ans) => {
        return ans;
      });
      const correctAns = props.question["correct_answer"];
      const randomIndex = Math.floor(Math.random() * 5);
      optTemp.splice(randomIndex, 0, correctAns);
      return optTemp;
    });
  }, []);

  const updateQuestion = (e) => {
    props.setNumber((prev) => prev + 1);
    props.setDisabled(() => false);
    if (e.target.innerText === props.question["correct_answer"]) {
      props.setCorrectCount((prev) => prev + 1);
    }
    props.setTime(20);
  };
  return (
    <div className="question">
      <div className="quesContainer">
        <p className="questionNumber">Question {props.number}.</p>
        <p
          className="quesStatement"
          dangerouslySetInnerHTML={{
            __html: decodeHtmlEntities(props.question["question"]),
          }}
        ></p>
      </div>
      <ul className="options">
        {optionsArray.map((option, index) => {
          return (
            <li>
              <button
                key={index}
                className="ans"
                disabled={props.disabled}
                onClick={updateQuestion}
                dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(option) }}
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;
