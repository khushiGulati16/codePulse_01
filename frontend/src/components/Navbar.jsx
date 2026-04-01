import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, Code, Users, Trophy, LayoutDashboard } from 'lucide-react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [onlineCount, setOnlineCount] = useState(0);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            transports: ['websocket', 'polling'],
            auth: { token }
        });
        
        socket.on('connect', () => {
            console.log('Socket connected to server with token status:', !!token);
        });

        socket.on('online_count', (count) => {
            console.log('Online count received:', count);
            setOnlineCount(count);
        });

        socket.on('global_solve', (data) => {
            toast.info(
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Trophy size={16} color="#fbbf24" />
                    <span><b>{data.user_name}</b> solved <b>{data.problem_title}</b>!</span>
                </div>
            );
        });

        return () => socket.disconnect();
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code size={28} color="#6366f1" />
                    CodePulse
                </Link>

                <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <NavLink to="/problems" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Problems</NavLink>
                    {user && <NavLink to="/submissions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>History</NavLink>}
                    {user?.role === 'admin' && (
                        <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <LayoutDashboard size={16} /> Admin Hub
                        </NavLink>
                    )}
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
                        <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}></div>
                        <span style={{ fontWeight: 600 }}>{onlineCount} Online</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {user ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)', padding: '5px 12px', borderRadius: '20px' }}>
                                <UserIcon size={16} />
                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</span>
                            </div>
                            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>
                            <Link to="/register" className="btn-primary" style={{ padding: '8px 24px' }}>Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
