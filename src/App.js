import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute  from './components/ProtectedRoute'
import Login from './pages/JSX/Login'
import Home from './pages/JSX/Home'
import Dashboard from './pages/JSX/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} /> {/* home page route */}
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} /> {/* Dashboard page route */}
      </Routes>
    </Router>
  );
}

export default App;
