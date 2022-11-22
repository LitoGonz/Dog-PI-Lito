import './App.css';
import {Route} from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import Home from './Components/Home';
import Detail from './Components/Detail'
import DogCreate from './Components/DogCreate'
import Navbar from './Components/Navbar';

function App() {
  
  return (
    
    <div className="App">
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home} /> 
        <Route exact path= '/home/:id' component={Detail} />
        <Route path= '/dogs' component={DogCreate}/>
    </div>
    
  );
}

export default App;

