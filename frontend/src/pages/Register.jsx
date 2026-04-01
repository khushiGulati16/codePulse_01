import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '450px', margin: '40px auto' }}>
            <div className="glass-card">
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                        <UserPlus color="#10b981" size={30} />
                    </div>
                    <h2 style={{ fontSize: '2rem' }}>Join CodePulse</h2>
                    <p style={{ color: '#64748b', marginTop: '5px' }}>Master coding and land top tech jobs</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
                    <input type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                    <input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
                    <input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />

                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Role</label>
                    <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                        <option value="user">Candidate</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px', height: '50px', background: '#10b981' }}>Create Account</button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b' }}>
                    Already have an account? <Link to="/login" style={{ color: '#10b981', fontWeight: 600 }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
