/*global chrome*/

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import logo from './logo.png'
import { AnimatePresence, motion } from 'framer-motion'
import { MemoryRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Pomodoro from './components/pomodoro'
import Todo from './components/todo'
import Settings from './components/settings'

const transition = { type: "spring", bounce: 0.32, duration: 0.42, ease: [0.43, 0.13, 0.23, 0.96] }


function App() {
  return (
    <Router>
      <nav className="flex content-around items-center justify-evenly py-4">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </Link>
        <Link to="/pomodoro">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link>
        <Link to="/todo">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </Link>
        <Link to="/settings">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>  
      </nav>
      <Route 
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" render={() => <Analytics />} />
              <Route exact path="/pomodoro" render={() => <Pomodoro transition={transition} />} />
              <Route exact path="/todo" render={() => <Todo transition={transition} />} />
              <Route exact path="/settings" render={() => <Settings transition={transition} />} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  )
}

function Analytics() {
  const [procTotal, setProcTotal] = useState(0)
  const [procSessions, setProcSessions] = useState(0)
  const [websites, setWebsites] = useState([])

  useEffect(() => {
    chrome.storage.local.get(['procTotal'], result => {
      setProcTotal(result.procTotal)
    })
    chrome.storage.local.get(['procSessions'], result => {
      setProcSessions(result.procSessions)
    })
    chrome.storage.local.get(['procSites'], result => {
      setWebsites(result.procSites)
    })
  }, [])

  let websitesArray = Object.keys(websites)

  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60000)
    let s = ((seconds % 60000) / 1000).toFixed(0)

    if (minutes > 0) {
      return `${minutes}m ${s}s`
    } else {
      return `${s}s`
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={transition}
      className="w-10/12 mx-auto"
    >
      <motion.h1 className="text-3xl my-2 font-bold tracking-tight">Analytics</motion.h1>
      <h1 className="text-center text-6xl font-bold text-red-500 my-6">{ formatTime(procTotal) }</h1>
      <p className="text-gray-400 text-base text-center font-semibold mb-4">time procrastinated over <span className="text-gray-500 font-bold italics">{ procSessions }</span> session{procSessions != 1 ? 's' : ''}
      </p>
      { websitesArray.map(website => (
        <div className="flex flex-row mx-auto items-center bg-white">
          <p className="flex-grow text-lg font-medium truncate text-gray-600">{website}</p>
          <span className="flex-grow-0 my-2 ml-2 font-bold text-lg text-red-500">{ formatTime(websites[website]) }</span>
        </div>
      )) }
    </motion.div>
  )
}

// function Settings() {
//   const [workSites, setWorkSites] = useState([])

//   useEffect(() => {
//     /*global chrome*/
//     chrome.storage.local.get(['workSites'], result => {
//       setWorkSites(result.workSites)
//     })
//   }, [])

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 8 }}
//       transition={transition}
//       className="w-10/12 mx-auto"
//     >
//       <motion.h1 className="text-3xl my-2 font-bold tracking-tight">Settings</motion.h1>
//       {
//         workSites.map((site, index) => (
//           <div key={index} className="flex flex-row mx-auto items-center bg-white">
//             <p className="flex-grow text-lg font-medium truncate text-gray-600">{ site }</p>
//             <button
//               className="flex-grow-0 my-2 ml-2 outline-none"
//               onClick={() => {  }}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         ))
//       }
//     </motion.div>
//   )
// }

ReactDOM.render(
    <App />,
  document.getElementById('root')
)