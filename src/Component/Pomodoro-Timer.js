// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useEffect, useState } from 'react';
import '../CSS/PomodoroTimer.css';
const PomodoroTimer=()=>{

    const workTime=25;
    const breakTime=1;

    const [minutes,setMinutes]=useState(25);
    const [seconds,setSeconds]=useState(0);
    const [isRunning,setIsRunning]=useState(false);
    const [isWorkTime,setIsWorkTime]=useState(true);
    const [cyclesCompleted,setCyclesCompleted]=useState(0);

    const toggleTimer=()=>{
        setIsRunning(!isRunning);
    };

    const resetTimer=()=>{
        setIsRunning(false);
        setIsWorkTime(true);
        setMinutes(workTime);
        setSeconds(0);
        setCyclesCompleted(0);
    };

    useEffect(()=>{
        let timerInterval= null;
        
        if(isRunning){
            timerInterval=setInterval(()=>{
                if(seconds === 0)
                {
                    if(minutes === 0)
                    {
                        if(!isWorkTime && cyclesCompleted>=1)
                        {
                            setIsRunning(false);
                            setIsWorkTime(true);
                            setMinutes(25);
                            setSeconds(0);
                            setCyclesCompleted(0);
                        }else{
                        if(isWorkTime)
                        {
                            setIsWorkTime(false);
                            setMinutes(breakTime);
                            setSeconds(0);
                            setCyclesCompleted((prevCycles)=>prevCycles+1);
                        }
                        else
                        {
                            setIsWorkTime(true);
                            setMinutes(workTime);
                            setSeconds(0);
                        }
                    }
                    }
                    else
                    {
                        setMinutes((prevMinutes)=>prevMinutes-1);//reduce minutes
                        setSeconds(59);//set seconds to 59 when previous minutes ends
                    }
                }else
                {
                    setSeconds((prevSeconds)=>prevSeconds-1);
                }
            },1000);
        }else
        {
            clearInterval(timerInterval);
        }

        return ()=>clearInterval(timerInterval);
    },[isRunning,minutes,seconds,isWorkTime,cyclesCompletedn]);

    return(
        <div className='timer-container'>
            <h1 className='timer-title'>POMODORO TIMER</h1>
            <h2 className='status-message'>{isWorkTime ? "FOCUS!!!" : "BREAK!!!"}</h2>
            {/* <h2>{isWorkTime ? "Work" : "Break"} Time</h2> */}
            <div className='clock'>
                <h2>{String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")}</h2>
            </div>
            <div className='button-container'>
                <button onClick={toggleTimer} className='control-button'>{isRunning ? "Pause":"Start"}</button>
                <button onClick={resetTimer} className='control-button'>Reset</button>
            </div>
        </div>
    );
};

export default PomodoroTimer;