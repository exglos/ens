import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Claim from './Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/claim/:subdomain' element ={<Claim/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;