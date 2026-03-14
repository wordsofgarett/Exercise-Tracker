import './App.css'
import Navigation from './components/Navigation';
import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Create from './pages/Create'
import Resources from './pages/Resources'
import Home from './pages/Home'
import Edit from './pages/Edit'

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <>
      <div className="app">
        <header>
          <h1>Exercise Tracker</h1>
          <p>Don't let the fascists be stronger than you</p>
        </header>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home setExerciseToEdit = {setExerciseToEdit} />}></Route>
            <Route path="/edit" element={<Edit exerciseToEdit = {exerciseToEdit} />}></Route>
            <Route path="/create" element={ <Create />}></Route>
            <Route path="/resources" element={ <Resources />}></Route>
          </Routes>
        </Router>
        <footer>
          &copy; 2026 Garett Foster
        </footer>
    </div>
    </>
  );
}

export default App