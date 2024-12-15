import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Donation from './components/Donation';
import Do from './components/Do';
import SurvivalGuide from './components/SurvivalGuide';
import Chatbot from './components/Chatbot';
import GlacierMap from './components/GlacierMap';
import WeatherApp from './components/WeatherApp';
function App() {
  return (
    <>
     <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/donation' element={<Donation/>} />
          <Route exact path='/do' element={<Do/>} />
          <Route exact path='/survival' element={<SurvivalGuide/>} />
          <Route exact path='/chatbot' element={<Chatbot/>} />
          <Route exact path='/map' element={<GlacierMap/>} />
          <Route exact path='/weather' element={<WeatherApp/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
