import { useState, Component } from 'react'
import { motion } from 'framer-motion'

export default class Pomodoro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      label: 'Session',
      timeLeftInSeconds: 1500,
      isStart: false,
      timerInterval: null
    }

    this.onIncreaseBreak = this.onIncreaseBreak.bind(this)
    this.onDecreaseBreak = this.onDecreaseBreak.bind(this)
    this.onIncreaseSession = this.onIncreaseSession.bind(this)
    this.onDecreaseSession = this.onDecreaseSession.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onStartStop = this.onStartStop.bind(this)
    this.decreaseTimer = this.decreaseTimer.bind(this)
    this.phaseControl = this.phaseControl.bind(this)
  }

  onIncreaseBreak() {
    if (this.state.breakLength < 60 && !this.state.isStart) {
      this.setState({
        breakLength: this.state.breakLength + 1
      })
    }
  }

  onDecreaseBreak() {
    if (this.state.breakLength > 1 && !this.state.isStart) {
      this.setState({
        breakLength: this.state.breakLength - 1
      })
    }
  }

  onIncreaseSession() {
    if (this.state.sessionLength < 60 && !this.state.isStart) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeftInSeconds: (this.state.sessionLength + 1) * 60
      })
    }
  }

  onDecreaseSession() {
    if (this.state.sessionLength > 1 && !this.state.isStart) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeftInSeconds: (this.state.sessionLength - 1) * 60
      })
    }
  }

  onReset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      label: 'Session',
      timeLeftInSeconds: 1500,
      isStart: false,
      timerInterval: null
    })
  }

  onStartStop() {
    if (!this.state.isStart) {
      this.setState({
        isStart: !this.state.isStart,
        timerInterval: setInterval(() => {
          this.decreaseTimer()
          this.phaseControl()
        }, 1000)
      })
    } else {
      this.state.timerInterval && clearInterval(this.state.timerInterval)

      this.setState({
        isStart: !this.state.isStart,
        timerInterval: null
      })
    }
  }

  decreaseTimer() {
    this.setState({
      timeLeftInSeconds: this.state.timeLeftInSeconds - 1
    })
  }

  phaseControl() {
    if (this.state.timeLeftInSeconds === -1) {
      if (this.state.label === 'Session') {
        this.setState({
          label: 'Break',
          timeLeftInSeconds: this.state.breakLength * 60
        })
      } else {
        this.setState({
          label: 'Session',
          timeLeftInSeconds: this.state.sessionLength * 60
        })
      }
    }
  }

  formatTime(seconds) {
    let minute = Math.floor(seconds / 60)
    if (minute < 10) { minute = '0' + minute }
    let second = seconds - 60 * minute
    if (second < 10) { second = '0' + second }

    return `${minute}:${second}`
  }

  render() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={this.props.transition}
        className="w-10/12 mx-auto"
      >
        <h1 className="text-3xl my-2 font-bold tracking-tight">Pomodoro</h1>
        <h1 className="mt-8 text-8xl leading-none font-bold text-red-500 text-center proportional-nums">{ this.formatTime(this.state.timeLeftInSeconds) }</h1>
        <div className="text-center">
          <span className="text-lg mt-2 inline-block font-semibold px-4 border-gray-300 text-gray-400 border-2 rounded-full">{ this.state.label }</span>
        </div>
        <div className="flex items-center justify-evenly my-12">
          <motion.button
            whileTap={{ scale: 0.972 }}

            onClick={this.onStartStop}
            className="uppercase bg-red-500 text-white font-bold tracking-tighter rounded-xl py-4 px-16 focus:outline-none"
          >
            { this.state.isStart ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              :
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.972 }}

            onClick={this.onReset}
            className="uppercase bg-red-500 text-white font-bold tracking-tighter rounded-xl py-4 px-16 focus:outline-none"
            disabled={this.state.isStart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>
        </div>
        <div className="flex items-center justify-around">
          <div>
            <div className="flex items-center">
              <button onClick={this.onDecreaseBreak} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="font-bold text-4xl text-gray-800 m-4">{this.state.breakLength}</span>
              <button onClick={this.onIncreaseBreak} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-center font-semibold text-gray-400">Break</p>
          </div>
          <div>
            <div className="flex items-center">
              <button onClick={this.onDecreaseSession} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="font-bold text-4xl text-gray-800 m-4">{this.state.sessionLength}</span>
              <button onClick={this.onIncreaseSession} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-center font-semibold text-gray-400">Session</p>
          </div>
        </div>
      </motion.div>
    )
  }
}