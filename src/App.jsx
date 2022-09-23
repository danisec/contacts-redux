import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/Home/Home'
import AddContact from './components/AddContact/AddContact'
import EditContact from './components/EditContact/EditContact'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addcontact' element={<AddContact />} />
        <Route path='/editcontact/:id' element={<EditContact />} />
      </Routes>
    </>
  )
}

export default App
