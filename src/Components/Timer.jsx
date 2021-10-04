import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.convertToMinSec = this.convertToMinSec.bind(this);
  }

  //this function will convert duration from seconds to timer format : mm : ss
  convertToMinSec = (duration) => {

    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    minutes = minutes < 10 ? ('0' + minutes) : minutes;
    seconds = seconds < 10 ? ('0' + seconds) : seconds;

    return `${ minutes }:${ seconds }`;
  }

  render() {
    return (
      <div className="running-clock">
        <h2 id="timer-label">{ this.props.cycle } Time</h2>

        <div id="time-left">
          { this.convertToMinSec(this.props.clock) }
        </div>

        <div className="buttons">
          <button 
            id="start_stop"
            className={ this.props.isPlaying ? 'pause' : 'play' }
            onClick={ this.props.handlePlay }>
            { this.props.isPlaying ? 'Pause' : 'Play' }
          </button>

          <button 
            id="reset"
            className="reset"
            onClick={ this.props.handleReset }>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;