

import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram'
import {Header, ProductList, Form} from '../widgets';

import './App.css'

function App() {

  const { tg } = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <>
      <Header />
      <h1>Vite + React</h1>

      <Routes>
        <Route index element={<ProductList />} />
        <Route path='form' element={<Form />} />
      </Routes>
    </>
  )
}

export default App
