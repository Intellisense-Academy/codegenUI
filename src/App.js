import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/JSX/Login'
import Dashboard from './pages/JSX/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />          {/* Default to login */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
