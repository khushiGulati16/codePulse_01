import { useState, useEffect } from 'react';
import api from '../api/api';
import { Users, FileCode, CheckCircle, Database, Clock, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/stats');
            setStats(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loader">Analyzing Platform Metrics...</div>;

    const cards = [
        { title: 'Total Users', value: stats.users, icon: <Users size={24} color="#6366f1" />, bg: 'rgba(99, 102, 241, 0.1)' },
        { title: 'Challenges', value: stats.problems, icon: <Database size={24} color="#f59e0b" />, bg: 'rgba(245, 158, 11, 0.1)' },
        { title: 'Submissions', value: stats.submissions, icon: <FileCode size={24} color="#10b981" />, bg: 'rgba(16, 185, 129, 0.1)' },
        { title: 'Success Rate', value: '42%', icon: <CheckCircle size={24} color="#8b5cf6" />, bg: 'rgba(139, 92, 246, 0.1)' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '30px' }}>Admin Command Center</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {cards.map((card, i) => (
                    <div key={i} className="glass-card" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(15, 23, 42, 0.6)' }}>
                        <div style={{ background: card.bg, padding: '15px', borderRadius: '15px' }}>{card.icon}</div>
                        <div>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '4px' }}>{card.title}</p>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{card.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div className="glass-card" style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Clock size={20} color="#6366f1" /> Recent Activity</h3>
                        <button className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>Refresh Feed</button>
                    </div>
                    
                    <div className="activity-feed">
                        {stats.recent.map((sub, i) => (
                            <div key={i} style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontWeight: 600, color: '#f8fafc' }}>{sub.User.name}</p>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Solved <b>{sub.problem.title}</b></p>
                                </div>
                                <span style={{ 
                                    padding: '4px 12px', 
                                    borderRadius: '12px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: 700,
                                    background: sub.status === 'Accepted' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: sub.status === 'Accepted' ? '#10b981' : '#ef4444'
                                }}>{sub.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '30px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}><Database size={20} color="#f59e0b" /> Manage Logic</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>Control the coding challenges and system parameters.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <Link to="/admin/problems/new" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
                            <Plus size={18} /> New Challenge
                        </Link>
                        <button className="btn-secondary" style={{ width: '100%' }}>User Management</button>
                        <button className="btn-secondary" style={{ width: '100%', color: '#ef4444' }}>System Maintenance</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
