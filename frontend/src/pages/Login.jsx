import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            login(res.data.user, res.data.token);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '450px', margin: '60px auto' }}>
            <div className="glass-card">
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                        <LogIn color="#6366f1" size={30} />
                    </div>
                    <h2 style={{ fontSize: '2rem' }}>Login to CodePulse</h2>
                    <p style={{ color: '#64748b', marginTop: '5px' }}>Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                    <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
                    <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px', height: '50px' }}>Sign In</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#6366f1', fontWeight: 600 }}>Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
