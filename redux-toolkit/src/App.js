import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Contact from './components/Contact';
import Home from './components/Home';
import Admin from './components/Admin';
import About from './components/About';
function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='*' element={<h1 style={{textAlign:'center'}}>404. Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
