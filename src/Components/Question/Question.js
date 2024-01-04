import React, { useState, useEffect } from "react";

const Question = (props) => {
  const [optionsArray, setOptions] = useState([]);

  useEffect(()=>{
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

  const updateQuestion = (e)=>{
    props.setNumber((prev) => prev + 1);
    props.setDisabled(()=> false);
    if(e.target.innerText === props.question["correct_answer"]){
      props.setCorrectCount(prev => prev + 1);
    }
    props.setTime(20);
  }
  return (
    <div className="question">
      <p className="questionNumber">Question {props.number}</p>
      <p className="quesStatement">{props.question["question"]}</p>
      <ul className="options">
        {optionsArray.map((option, index) => {
          return <button key={index} className="ans" disabled={props.disabled} onClick={updateQuestion}>{option}</button>;
        })}
      </ul>
    </div>
  );
};

export default Question;
