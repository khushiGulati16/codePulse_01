import { useState, useEffect } from 'react';
import api from '../api/api';
import { BookOpen, ChevronRight, Search } from 'lucide-react';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    const categories = ['Aptitude', 'DSA', 'Technical', 'HR Interview'];

    useEffect(() => {
        setLoading(true);
        api.get(`/resources?category=${category}`)
            .then(res => setResources(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [category]);

    return (
        <div>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Preparation Library</h1>
                <p style={{ color: '#64748b' }}>Master the basics and advanced concepts</p>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }}>
                <button
                    onClick={() => setCategory('')}
                    className={category === '' ? 'btn-primary' : 'btn-secondary'}
                > All </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={category === cat ? 'btn-primary' : 'btn-secondary'}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div>Loading resources...</div>
            ) : (
                <div className="grid grid-cols-2">
                    {resources.map(res => (
                        <div key={res.id} className="glass-card" style={{ cursor: 'pointer', transition: 'transform 0.3s' }} onClick={() => alert('Feature coming soon: Full article view')}>
                            <div style={{ padding: '4px 10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, width: 'fit-content', marginBottom: '15px' }}>
                                {res.category}
                            </div>
                            <h3 style={{ marginBottom: '10px' }}>{res.title}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {res.content}
                            </p>
                            <div style={{ marginTop: '20px', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                                Read More <ChevronRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && resources.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px', background: 'var(--glass)', borderRadius: '16px' }}>
                    <BookOpen size={48} style={{ color: '#64748b', marginBottom: '20px' }} />
                    <p style={{ color: '#64748b' }}>No resources found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default Resources;
