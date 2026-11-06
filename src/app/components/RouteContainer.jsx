import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './private/Dashboard'
import useStore from '../configurations/useStore'
import Login from './public/Login'
import Sidebar from './Base/Sidebar'
import AddAllotment from './private/allotments/AddAllotment'
import ViewAllotments from './private/allotments/ViewAllotments'
import ViewBook from './private/Book/Viewbook'
import AddStudent from './private/student/Addstudent'
import ViewStudents from './private/student/Viewstudents'
import AddBook from './private/Book/Addbook'





export default function RouteContainer  ()  {
    const { auth } = useStore()
  return (
   <>
    <BrowserRouter>
    
      {auth.isLogin && <Sidebar/>}
      {auth.isLogin ?
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/students' element={<ViewStudents/>} />
        <Route path='/students/add' element={<AddStudent/>} />
        <Route path='/books' element={<ViewBook/>} />
        <Route path='/books/add' element={<AddBook/>} />
        <Route path='/allotments' element={<ViewAllotments/>} />
        <Route path='/allotments/add' element={<AddAllotment/>} />
        
        <Route path='*' element={<Navigate replace to="/" />}/>


      </Routes>
        :
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='*' element={<Navigate replace to="/login" />}/>
        </Routes>
}

    </BrowserRouter>


   </>
  )
}