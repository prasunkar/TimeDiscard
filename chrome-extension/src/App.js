import { motion } from 'framer-motion'

function App() {
  return (
    <div
      className="grid grid-rows-2"
      style={{ height: "568px" }}
    >
      <motion.div
        className="flex justify-center items-center flex-col"
        initial={{ translateY: 96, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.84, easings: "ease", bounce: 0.32, type: "spring", delay: 0.12 }}
      >
        <h1 className="font-sans text-6xl font-bold tracking-tighter mb-4">Welcome</h1>
        <p className="text-gray-500 text-lg">Let's get to work.</p>
      </motion.div>
      <div className="flex justify-center items-center flex-col">
        <motion.button
          className="py-3 w-72 m-2 font-semibold rounded-lg shadow-md text-blue-600 text-xl border-4 border-blue-600"
          whileHover={{ scale: 1.016 }}
          whileTap={{ scale: 1 }}
        >
          Log In
        </motion.button>
        <motion.button
          className="py-3 w-72 m-2 font-semibold rounded-lg shadow-md text-white text-xl bg-blue-600 border-4 border-blue-600"
          whileHover={{ scale: 1.016 }}
          whileTap={{ scale: 1 }}
        >
          Sign Up
        </motion.button>
      </div>
    </div>
  )
}

export default App;
