import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-blue-500">
      Hello world!
    </h1>
    </>
  )
}

export default App
