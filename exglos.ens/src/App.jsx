import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Claim from './Checkout';
import Success from './Success';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/claim/:subdomain' element ={<Claim/>}/>
        <Route path='/success/:txHash' element ={<Success/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;