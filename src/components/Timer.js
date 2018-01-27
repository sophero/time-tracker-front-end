import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      // taskList: [],
      curTime: 0,
      startTime: 0,
      totalTime: 0,
      working: false
    };
    this.startWork = this.startWork.bind(this);
    this.stopWork = this.stopWork.bind(this);
    this.updateCurTime = this.updateCurTime.bind(this);
  }
  render() {
    console.log('curTime', this.state.curTime);
    let totalTime = this.millisecsToHourMinSecString(this.state.totalTime);
    let curTime = this.millisecsToHourMinSecString(this.state.curTime);

    return (
      <div>
        <button disabled={this.state.working} onClick={this.startWork}>
          Start working
        </button>
        <button disabled={!this.state.working} onClick={this.stopWork}>
          Stop working
        </button>
        <div>
          <h2>Current working time:</h2>
          {curTime}
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  millisecsToHourMinSecString(millisecs) {
    function addZeroNumToStr(num) {
      if (num < 10) {
        return String('0' + num);
      } else {
        return String(num);
      }
    }
    let secs = millisecs / 1000;
    let hours = Math.floor(secs / 3600);
    let mins = Math.floor(secs / 60) % 60;
    let remSecs = Math.floor(secs % 60);
    mins = addZeroNumToStr(mins);
    remSecs = addZeroNumToStr(remSecs);
    if (hours === 0) {
      return `${mins}:${remSecs}`;
    } else {
      return `${hours}:${mins}:${remSecs}`;
    }
  }
  updateCurTime() {
    this.timer = setTimeout(() => {
      let curTime = Date.now() - this.state.startTime;
      this.setState({ curTime }, this.updateCurTime);
    }, 1000);
  }
  startWork() {
    this.setState({ curTime: 0 });
    let d = new Date();
    this.setState(
      {
        startTime: d.getTime(),
        working: true
      },
      this.updateCurTime
    );
    // AJAX call to database, create new time segment with: startTime, activity name, user id..
  }
  stopWork() {
    clearTimeout(this.timer);
    let d = new Date();
    let millisecDiff = d.getTime() - this.state.startTime;
    // insert AJAX call to write stopTime for the current time segment
    let totalTime = this.state.totalTime + millisecDiff;
    this.setState({
      totalTime,
      working: false
    });
  }
}

export default Timer;
