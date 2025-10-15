import React from 'react'
import First from './components/organisms/First'
import Home from './components/pages/Home'
import Nosotros from './components/pages/Nosotros'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home />}/>
        <Route path='/nosotros' element={<Nosotros />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
