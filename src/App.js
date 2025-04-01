import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './index.css'
import Home from '../src/pages/Home/index'

function App() {
  return (
    <Router>
      <Routes>
        <Route  path='/' element = {<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
