

import { useEffect } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import './App.css'
import Button from '../ui/Button/Button'
import Header from '../widgets/Header/Header'




function App() {

  const { tg, onToggleButton } = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <>
      <Header />
      <h1>Vite + React</h1>
      <Button onClick={onToggleButton}>Toggle</Button>
    </>
  )
}

export default App
