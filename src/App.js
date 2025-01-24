import React, { useEffect, useState } from 'react'
import './App.css'
import data from './question.json';
import correct from './sounds/correct.mp3';
import wrong from './sounds/wrong.mp3';
function App(){
  const[currentquestion,setcurrentQuestion]=useState(0);
  const[score,setScore]=useState(0);
  const[selectOption,setSelectOption]=useState(null);
  const[showScore,setShowScore]=useState(false);
  const[timer,setTimer]=useState(10);

useEffect(()=>{
    let interval;
    if(timer>0 && !showScore){
      interval=setInterval(()=>{
        setTimer((prevTime)=>prevTime-1);
      },1000);
    }
    else if(timer===0){
      if(currentquestion < data.length-1){
        setcurrentQuestion ((prevquestion)=>prevquestion+1);
        setTimer(10);
        setSelectOption(null);
      }else{
        setShowScore(true);
      }
    
    
    
    }
    
    return()=>clearInterval(interval);
},[timer,showScore,currentquestion]);

function restartquiz(){
  setSelectOption(null);
  setScore(0);
  setShowScore(false);
  setTimer(10);
  setcurrentQuestion(0);
}

  
  const handleClick=(option)=>{
    setSelectOption(option);

    if(option===data[currentquestion].correctOption){
      setScore((prev)=>prev+1);
       const audio=new Audio(correct)
       audio.play();

    }
    else{
      const audio=new Audio(wrong)
       audio.play();
    }

  }
  return (
    <div>
    <div className='quiz-app'>
      {showScore?
      (
        <div className='score-section'>
            Score :{score}/{data.length}
            <button onClick={restartquiz}>restart</button>
      </div>
      ):(
        <div className='question-section'>
        <h2>QUESTION {currentquestion+1}</h2>
        <p>{data[currentquestion].question}</p>
        <div className='options'>
          {data[currentquestion].options.map((option,index)=>(
            
            <button key={index}
            onClick={()=>handleClick(option)}
            style={{
              backgroundColor:
              selectOption===option?
              option===data[currentquestion].correctOption
              ? 'green' :'red':""
            }}
            disabled={!!selectOption}
            >{option}
        </button>
))}
        </div>
        <div className='timer'>Time Left : <span>{timer}</span></div>

      </div>
      )
      }
      
      
    </div>
    </div>
  )
}

export default App