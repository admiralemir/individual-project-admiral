import { BrowserRouter, Routes, Route } from 'react-router'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import BorrowingForm from './pages/BorrowingForm.jsx'
import CarLayout from './components/CarLayout.jsx'
import Cars from './pages/Cars.jsx'
import SubmittedForm from './pages/SubmittedForm.jsx'
import HomeLayout from './components/HomeLayout.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<HomeLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/submitted' element={<SubmittedForm />} />
        </Route>
        <Route path='/form-create' element={<BorrowingForm />} />
        <Route element={<CarLayout />}>
          <Route path="/cars" element={<Cars />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}

export default App
