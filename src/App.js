import { useEffect, useState } from 'react';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import { BrowserRouter, Route} from 'react-router-dom';
import useSound from 'use-sound';

function App() {
  const[play, {pause}] = useSound('/sounds/startMusic.wav')
  // const [coore]
  useEffect(()=>play())
  return (
      <BrowserRouter>
          <Route path="/" exact component={Welcome} />
          <Route path="/home" component={Home} /> 
      </BrowserRouter>
  )
}

export default App;
