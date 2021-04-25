/*global chrome*/

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Formik, Field, Form } from 'formik'

export default function Settings({ transition }) {
  const [workSites, setWorkSites] = useState([])

  useEffect(() => {
    chrome.storage.local.get(['workSites'], result => {
      setWorkSites(result.workSites)
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={transition}
      className="w-10/12 mx-auto"
    >
      <motion.h1 className="text-3xl my-2 font-bold tracking-tight">Settings</motion.h1>
      <div>
        { workSites.map((site, index) => (
          <div key={index} className="flex flex-row mx-auto items-center bg-white">
            <p className="flex-grow text-lg font-medium truncate text-gray-600">{ site }</p>
            <button
              className="flex-grow-0 my-2 ml-2 outline-none"
              onClick={() => {
                const newWorkSites = workSites.filter(workSite => workSite !== site)
                setWorkSites(newWorkSites)
                chrome.storage.local.set({ 'workSites': newWorkSites })
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )) }
      </div>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={(values, { resetForm }) => {
          resetForm()
          const newWorkSites = [...workSites, values.text]
          setWorkSites(newWorkSites)
          chrome.storage.local.set({ 'workSites': newWorkSites })
        }}
      >
        <Form>
          <div className="flex flex-row mx-auto mt-2 mb-6">
            <Field
              id="text"
              name="text"
              type="text"
              placeholder="Add a work site!"
              autoComplete="off"
              className="flex-grow text-lg outline-none"
            />
            <button type="submit" className="flex-grow-0 outline-none ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </Form>
      </Formik>
    </motion.div>
  )
}