import { useState, useEffect } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { Code, Terminal, ChevronRight, Activity, Zap, Star, Trash2, Edit, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Problems = () => {
    const { user } = useAuth();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/problems')
            .then(res => setProblems(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this challenge permanently?')) {
            try {
                await api.delete(`/admin/problems/${id}`);
                setProblems(problems.filter(p => p.id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const getDifficultyColor = (diff) => {
        switch (diff) {
            case 'Easy': return '#10b981';
            case 'Medium': return '#f59e0b';
            case 'Hard': return '#ef4444';
            default: return '#64748b';
        }
    };

    const getDifficultyBg = (diff) => {
        switch (diff) {
            case 'Easy': return 'rgba(16, 185, 129, 0.15)';
            case 'Medium': return 'rgba(245, 158, 11, 0.15)';
            case 'Hard': return 'rgba(239, 68, 68, 0.15)';
            default: return 'rgba(100, 116, 139, 0.15)';
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div style={{ padding: '20px 0', minHeight: '85vh' }}>
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '50px', textAlign: 'center' }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(99, 102, 241, 0.15)', padding: '8px 20px', borderRadius: '30px', color: '#818cf8', fontWeight: 600, letterSpacing: '1px', fontSize: '0.85rem', marginBottom: '15px' }}>
                    <Activity size={16} /> ALGORITHM ARENA
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '15px' }}>
                    Coding Challenges
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    Push your problem-solving limits with our curated algorithms. 
                    From introductory concepts to advanced logic structures.
                </p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', padding: '10px' }}
            >
                {problems.map((prob, index) => (
                    <motion.div 
                        key={prob.id} 
                        variants={itemVariants}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="glass-card problem-card"
                        style={{
                            padding: '30px', 
                            borderRadius: '20px',
                            background: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Decorative background glow */}
                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: getDifficultyBg(prob.difficulty), filter: 'blur(50px)', opacity: 0.6, borderRadius: '50%' }}></div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '14px' }}>
                                <Terminal size={24} color="#818cf8" />
                            </div>
                            <span style={{ 
                                color: getDifficultyColor(prob.difficulty), 
                                background: getDifficultyBg(prob.difficulty), 
                                padding: '6px 14px', 
                                borderRadius: '20px', 
                                fontSize: '0.85rem', 
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                            }}>
                                {prob.difficulty === 'Easy' ? <Star size={14}/> : prob.difficulty === 'Medium' ? <Zap size={14}/> : <Activity size={14}/>}
                                {prob.difficulty}
                            </span>
                        </div>
                        
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#f8fafc', marginBottom: '15px', position: 'relative', zIndex: 1 }}>{prob.title}</h3>
                        
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1, position: 'relative', zIndex: 1 }}>
                            {prob.description}
                        </p>
                        
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '10px' }}>
                            <Link 
                                to={`/problems/${prob.id}`} 
                                className="btn-primary" 
                                style={{ 
                                    flexGrow: 1, 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    gap: '8px',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Solve Challenge <ChevronRight size={18} />
                            </Link>

                            {user?.role === 'admin' && (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Link 
                                        to={`/admin/problems/edit/${prob.id}`}
                                        className="btn-secondary"
                                        style={{ padding: '12px', borderRadius: '12px', color: '#6366f1', border: '1px solid rgba(99, 102, 241, 0.2)', display: 'flex' }}
                                        title="Edit Problem"
                                    >
                                        <Edit size={20} />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(prob.id)}
                                        className="btn-secondary"
                                        style={{ padding: '12px', borderRadius: '12px', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex' }}
                                        title="Delete Problem"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {problems.length === 0 && !loading && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    style={{ textAlign: 'center', padding: '80px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}
                >
                    <Code size={60} style={{ color: '#334155', marginBottom: '20px', margin: '0 auto' }} />
                    <h2 style={{ color: '#94a3b8', marginBottom: '10px' }}>No challenges available</h2>
                    <p style={{ color: '#64748b' }}>The academy is preparing new algorithms. Check back later.</p>
                </motion.div>
            )}
        </div>
    );
};

export default Problems;

