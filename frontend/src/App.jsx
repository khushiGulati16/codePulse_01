import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Problems from './pages/Problems';
import ProblemDetail from './pages/ProblemDetail';
import Submissions from './pages/Submissions';
import AdminDashboard from './pages/AdminDashboard';
import ManageProblem from './pages/ManageProblem';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { token, user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" />;
  return user?.role === 'admin' ? children : <Navigate to="/problems" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gradient">
          <Navbar />
          <main className="container" style={{ padding: '40px 20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/problems" element={<PrivateRoute><Problems /></PrivateRoute>} />
              <Route path="/problems/:id" element={<PrivateRoute><ProblemDetail /></PrivateRoute>} />
              <Route path="/submissions" element={<PrivateRoute><Submissions /></PrivateRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/problems/new" element={<AdminRoute><ManageProblem /></AdminRoute>} />
              <Route path="/admin/problems/edit/:id" element={<AdminRoute><ManageProblem /></AdminRoute>} />
            </Routes>
          </main>
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
