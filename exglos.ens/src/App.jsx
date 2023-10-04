import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Claim from './Checkout';
import Success from './Success';
import Admin from './Admin';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/login' element={<AdminLogin/>} />
        <Route path='/join' element={<AdminSignup />} />
        <Route path='/claim/:subdomain' element ={<Claim/>}/>
        <Route path='/success/:txHash' element ={<Success/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;