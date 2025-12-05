import './GuessTheNumber.css'
import { useState } from 'react'

const GuessTheNumber = () => {
    const [run, setRun] = useState(0)
    const [wicket, setWicket] = useState(0)
    const [balls, setBalls] = useState(1)
    const [overs, setOvers] = useState(0)
    const [history, setHistory] = useState([]);

    const saveHistory = () => {
        const prevState = { run, wicket, balls, overs };
        setHistory([...history, prevState]);
    };
    const oversPlayed = overs + (balls / 6);
    const runRate = oversPlayed > 0 ? (run / oversPlayed) : 0;

    const anyClick = (updateFn) => {
     
        saveHistory();

        updateFn();
        const newBalls = balls + 1;
        setBalls(newBalls);

        if (newBalls === 6) {
            setBalls(0);
            setOvers(overs + 1);
        }
    };


    const undoScore = () => {
        if (history.length === 0) return;

        const lastState = history[history.length - 1];
        setRun(lastState.run);
        setWicket(lastState.wicket);
        setBalls(lastState.balls);
        setOvers(lastState.overs);

        setHistory(history.slice(0, -1)); 
    };

    const resetScore = () => {
        setRun(0);
        setOvers(1);
        setWicket(0);
        setBalls(0);
        setHistory([]); 
    };

    return (
        <div className='scoreboard-main'>
            <div className='scorecard d-flex align-items-center border justify-content-center rounded-5 container row'>
                <div className="scorecard-1">
                            <div className='scorecardleft'>
                                <h1>Cricket Scoreboard</h1>
                                <h3>Wickets : {wicket}</h3>
                                <h3>Balls : {balls}</h3>
                                <h3>Overs : {overs}</h3>
                                <h3>Run Rate: {runRate.toFixed(2)}</h3>

                            </div>
                            <div className='scorecardright'>
                           <h1> {run} - {wicket} </h1>
                            </div>
                 </div>
                    <div className='row my-5 d-flex justify-content-center  align-items-start gap-3 '>
                        <button className='btn btn-primary col-3 p-3' onClick={() => anyClick(() => setRun(run + 0))}>0 </button>
                        <button className='btn btn-primary col-3 p-3' onClick={() => anyClick(() => setRun(run + 1))}>1</button>
                        <button className='btn btn-primary col-3 p-3' onClick={() => anyClick(() => setRun(run + 2))}>2</button>
                        <button className='btn btn-primary col-3 p-3' onClick={() => anyClick(() => setRun(run + 3))}>3</button>
                        <button className='btn btn-warning col-3 p-3' onClick={() => anyClick(() => setRun(run + 4))}>4</button>
                        <button className='btn btn-success col-3 p-3' onClick={() => anyClick(() => setRun(run + 6))}>6</button>
                           
                       
                             <button className='btn btn-danger  p-2 col-3' onClick={() => anyClick(() => setWicket(wicket + 1))}>Wicket</button>
                            <button className='btn btn-secondary  p-2 col-3 col-lg-3' onClick={undoScore}>Undo</button>
                            <button className='btn btn-dark  p-2 col-3 col-lg-3' onClick={resetScore}>Reset</button>
               
                    </div>
                </div>
           
        </div>
    );
};

export default GuessTheNumber;
