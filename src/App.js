import React, { Component } from 'react';
import Timer from './Components/Timer';
import TimeSet from './Components/TimeSet';
import Sound from './assets/pause.mp3';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cycle: 'Session',
      sessionTime: 25,
      breakTime: 5,
      clockCount: 0,
      started: false,
      isPlaying: false
    }

    this.loop = undefined;

    this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
    this.handleBreakIncrease = this.handleBreakIncrease.bind(this);
    this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
    this.handleSessionIncrease = this.handleSessionIncrease.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const sessionTime = this.state.sessionTime;

    this.setState({
      clockCount: sessionTime * 60
    });
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  handleSessionDecrease = () => {
    const sessionTime = this.state.sessionTime;

    if(sessionTime - 1 > 0) {
      this.setState({
        cycle: 'Session',
        sessionTime: sessionTime - 1
      });

      this.updateCount((sessionTime - 1));
    }
  }

  handleSessionIncrease = () => {
    const sessionTime = this.state.sessionTime;

    if(sessionTime + 1 < 61) {
      this.setState({
        cycle: 'Session',
        sessionTime: sessionTime + 1
      });

      this.updateCount((sessionTime + 1))
    }
  }

  handleBreakDecrease = () => {
    const breakTime = this.state.breakTime;

    if(breakTime - 1 > 0) {
      this.setState({
        cycle: 'Break',
        breakTime: breakTime - 1
      });

      this.updateCount((breakTime - 1))
    }
  }

  handleBreakIncrease = () => {
    const breakTime = this.state.breakTime;

    if(breakTime + 1 < 61) {
      this.setState({
        cycle: 'Break',
        breakTime: breakTime + 1
      });

      
      this.updateCount((breakTime + 1))
    }

  }

  updateCount(value) {
    this.setState({
      clockCount: value * 60
    });
  }

  handlePlay = () => {
    const isPlaying = this.state.isPlaying;
    const sessionTime = this.state.sessionTime;
    const started = this.state.started;

    if(!started) {
      this.setState({
        clockCount: sessionTime * 60,
        cycle: 'Session',
        started: true
      });
    }
    
    if(isPlaying) {
      clearInterval(this.loop);

      this.setState({
        isPlaying: false
      });
    }
    else {
      this.setState({
        isPlaying: true
      });

      this.loop = setInterval(() => {
        const clockCount = this.state.clockCount;
        const cycle = this.state.cycle;
        const breakTime = this.state.breakTime;
        const sessionTime = this.state.sessionTime;

        if(clockCount === 0) {
          this.setState({
            cycle: cycle === 'Session' ? 'Break' : 'Session',
            clockCount: cycle === 'Session' ? (breakTime * 60) : (sessionTime * 60)
          });

          this.playSound();
        } 
        else {
          this.setState({
            clockCount: clockCount - 1
          });
        }        
      }, 1000);
    }
  }

  playSound() {
    let audio = document.getElementById('beep');
    audio.currentTime = 0;
    audio.play();
  }

  handleReset = () => {
    this.setState({
      cycle: 'Session',
      sessionTime: 25,
      breakTime: 5,
      clockCount: 25 * 60,
      started: false,
      isPlaying: false
    });

    clearInterval(this.loop);

    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }

  render() {
    const breakProps = {
      title: 'Break',
      time: this.state.breakTime,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease
    }

    const sessionProps = {
      title: 'Session',
      time: this.state.sessionTime,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease
    }

    return (
      <div className={`App ${ this.state.cycle }`}>
        <main id="clock" className="clock">
        <h1 id="freeCodeCamp">freeCodeCamp 25+5 clock</h1>
          <div class="clock-container">
            <Timer
              handlePlay={ this.handlePlay }
              handleReset={ this.handleReset }
              clock={ this.state.clockCount }
              cycle={ this.state.cycle }
              isPlaying={ this.state.isPlaying }
            />

            <audio id="beep" preload="auto" src={ Sound } />

            <div className="set-timer">
            
               <div id="session"><TimeSet {...sessionProps} /></div>
               <div id="break"><TimeSet {...breakProps} /></div>
              
            </div>
          </div>
        </main>
      </div>
      
    );
  }
}

export default App;