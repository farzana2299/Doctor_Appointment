
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';

function App() {
  const {loading}=useSelector((state)=>state.alerts)
  return (
    <div>
      {loading ?(<Spinner></Spinner>):(
     <Routes>
      <Route path='/' element={<ProtectedRoute><HomePage></HomePage></ProtectedRoute>}/>
      <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor></ApplyDoctor></ProtectedRoute>}/>
      <Route path='/login' element={<PublicRoute><Login></Login></PublicRoute>}/>
      <Route path='/register' element={<PublicRoute><Register></Register></PublicRoute>}/>
     </Routes>
     )}
    </div>
  );
}

export default App;
