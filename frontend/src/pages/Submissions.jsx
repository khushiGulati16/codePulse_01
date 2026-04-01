import { useState, useEffect } from 'react';
import api from '../api/api';
import { Clock, CheckCircle2, XCircle, Code } from 'lucide-react';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/submissions')
            .then(res => setSubmissions(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <div>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Your Progress</h1>
                <p style={{ color: '#64748b' }}>Track your coding journey and submissions</p>
            </div>

            <div className="glass-card" style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                            <th style={{ padding: '20px' }}>Problem</th>
                            <th style={{ padding: '20px' }}>Language</th>
                            <th style={{ padding: '20px' }}>Status</th>
                            <th style={{ padding: '20px' }}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub, index) => (
                            <tr key={sub.id} style={{ borderBottom: index === submissions.length - 1 ? 'none' : '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ fontWeight: 600 }}>{sub.problem_title}</span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ textTransform: 'capitalize', color: '#64748b' }}>{sub.language}</span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: sub.status === 'Accepted' ? '#10b981' : '#ef4444' }}>
                                        {sub.status === 'Accepted' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                        <span style={{ fontWeight: 600 }}>{sub.status}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '20px', color: '#64748b' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Clock size={14} /> {getTimeAgo(sub.created_at)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {submissions.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '100px' }}>
                        <Code size={40} style={{ color: '#64748b', marginBottom: '15px' }} />
                        <p style={{ color: '#64748b' }}>You haven't submitted any solutions yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Submissions;
