import React from 'react'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import { Route, Routes } from 'react-router'

import Protected from './features/auth/components/Protected'
import Home from './features/interview/pages/Home'
import ReportDashboard from './features/interview/pages/ReportDashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Protected><Home/></Protected>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/interview/:interviewId' element={<ReportDashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
