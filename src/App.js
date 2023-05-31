import { Route, Routes } from 'react-router-dom';
import './App.css';
import Background from './components/Home';
import Context from './context/context';
import Genre from './components/genre';
import Moviepage from './components/moviepage';
import Query from './components/query';
/*update */

function App() {
  return (
    <Context className="App">
      <Routes>
        <Route path="/" element={<Background/>}/>
        <Route path="/moviepage/:movieId/:movieTitle" element={<Moviepage/>}/>
        <Route path="/movielist/:genreId" element={<Genre/>}/>
        <Route path="/query/:movieId" element={<Query/>}/>
      </Routes>
    </Context>
  );
}

export default App;
