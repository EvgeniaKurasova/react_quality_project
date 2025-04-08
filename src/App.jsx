import './App.css'
import './styles/reset.css'
import Layouts from './components/layouts/Layouts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AnimalList from './pages/AnimalList'
import About from './pages/About'
import Admin from './pages/Admin'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Основні маршрути з Layout */}
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="animal_list" element={<AnimalList />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>

        {/* Адмін-панель без Layout */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
