import { useState } from 'react'
import {  motion } from 'framer-motion'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

export default function Todo({ transition }) {
  const [todos, setTodos] = useState([
    { text: "Finish my homework" }
  ])

  const todoSchema = Yup.object().shape({
    text: Yup.string()
      .required('Write a todo!')
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={transition}
      className="w-10/12 mx-auto"
    >
      <motion.h1 className="text-3xl my-2 font-bold tracking-tight">Todo</motion.h1>
      <div>
        { todos.map((todo, index) => (
          <div key={index} className="flex flex-row mx-auto items-center bg-white">
            <p className="flex-grow text-lg font-medium truncate">{ todo.text }</p>
            <button
              className="flex-grow-0 my-2 ml-2 outline-none"
              onClick={() => {
                const newTodos = [...todos]
                newTodos.splice(index, 1)
                setTodos(newTodos)
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        )) }
      </div>
      <Formik
        initialValues={{ text: '' }}
        validationSchema={todoSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm()
          setTodos([...todos, { text: values.text }])
        }}
      >
        <Form>
          <div className="flex flex-row mx-auto mt-2 mb-6">
            <Field
              id="text"
              name="text"
              type="text"
              placeholder="What needs to be done?"
              autocomplete="off"
            
              className="flex-grow text-lg outline-none"
            />
            <button type="submit" className="flex-grow-0 outline-none ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </Form>
      </Formik>
    </motion.div>
  )
}