import { useEffect } from 'react'

function App() {
  useEffect(() => {
    fetch('http://localhost:5000/ping')
      .then((res) => res.json())
      .then((data) => {
        console.log('Counter from backend:', data.counter)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h1>React + Express Test</h1>
      <p>Check backend terminal </p>
    </div>
  )
}

export default App
