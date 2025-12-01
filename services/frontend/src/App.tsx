import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DocumentEditor from './pages/DocumentEditor';
import ProtectedRoutes from './authServices/ProtectedRoutes';
import Dashboard from './pages/Dashboard';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoutes />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/editor/:id" element={<DocumentEditor />} />
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
