import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {React} from 'react';
import Home from './Home.js'
import SingleMovie from './SingleMovie';
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="movie/:id" element={<SingleMovie/>}/>
    </Routes>

   </Router>
  );
}

export default App;
