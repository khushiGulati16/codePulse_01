import { useState, useEffect } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/jobs')
            .then(res => setJobs(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading job opportunities...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem' }}>Job Dashboard</h1>
                    <p style={{ color: '#64748b' }}>Discover your next career move</p>
                </div>
            </div>

            <div className="grid grid-cols-2">
                {jobs.map((job, index) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        key={job.id}
                        className="glass-card"
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '1.4rem', color: '#6366f1' }}>{job.role}</h3>
                                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', color: '#6366f1', fontWeight: 600 }}>Full-time</div>
                            </div>
                            <p style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '5px' }}>{job.company_name}</p>

                            <div style={{ marginTop: '20px', display: 'flex', gap: '20px', color: '#64748b', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <DollarSign size={16} /> {job.package}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <MapPin size={16} /> Remote / On-site
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Posted recently</span>
                            <Link to={`/jobs/${job.id}`} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px' }}>
                                View Details <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {jobs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px', background: 'var(--glass)', borderRadius: '16px' }}>
                    <Briefcase size={48} style={{ color: '#64748b', marginBottom: '20px' }} />
                    <h3>No jobs found</h3>
                    <p style={{ color: '#64748b' }}>Check back later for new opportunities.</p>
                </div>
            )}
        </div>
    );
};

export default Jobs;
