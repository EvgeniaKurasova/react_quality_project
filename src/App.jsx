import './App.css'
import './styles/reset.css'
import Layouts from './components/layouts/Layouts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AnimalList from './pages/AnimalList'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="animal_list" element={<AnimalList />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
