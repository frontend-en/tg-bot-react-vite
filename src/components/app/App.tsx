

import { useEffect } from 'react'
import './App.css'

const tg = window.Telegram.WebApp

function App() {

  useEffect(() => {
    tg.ready()
  }, [])


  const onClose = () => {
    tg.close()
  }



  return (
    <>


      <h1>Vite + React</h1>

      <button onClick={onClose}>Кнопка Закрыть</button>

    </>
  )
}

export default App
