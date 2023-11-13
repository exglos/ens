import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';
import Claim from './Checkout';
import Home from './Home';
import UserLogin from './Login';
import Success from './Success';
import './config/firebase-config';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }/>
        {/* <Route path='/user/login' element={<UserLogin />} /> */}
        {/* <Route path='/admin/login' element={<AdminLogin />} /> */}
        <Route path='/join' element={<AdminSignup />} />
        <Route path='/claim/:subdomain' element={<Claim />} />
        <Route path='/success/:txHash' element={<Success />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;