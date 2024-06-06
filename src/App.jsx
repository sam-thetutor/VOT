import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Index from "./components"
function App() {
  return (

   <Index/>

  )
}

export default () => (
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
