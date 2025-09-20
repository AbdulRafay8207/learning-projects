import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Todo from './pages/Todo'
import Quiz from './pages/Quiz'
import Stepper from './pages/Stepper'

function App() {
  return(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/todo' element={<Todo />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/stepper' element={<Stepper />} />
    </Routes>
  )
}

export default App
