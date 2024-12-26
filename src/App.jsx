import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'
import AdminHome from './components/Admin/AdminHome'
import AdminRoutes from './routes/AdminRoutes'
import StudentHome from './components/Student/StudentHome'
import StudentRoutes from './routes/StudentRoutes'
import RecruiterRoutes from './routes/RecruiterRoutes'
import RecruiterHome from './components/Recruiter/RecruiterHome'
import StudentRegister from './components/StudentRegister'

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/studenthome' element={<StudentHome />} />
          <Route path='/adminhome' element={<AdminHome />} />
          <Route path='recruiterhome' element={<RecruiterHome/>} />
          <Route path='/studentregister' element={<StudentRegister/>} />

          
          {/* Admin routes */}
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/student/*' element={<StudentRoutes />} />
          <Route path='/recruiter/*' element={<RecruiterRoutes />} />

        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
