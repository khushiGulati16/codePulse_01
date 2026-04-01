import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { ArrowLeft, Briefcase, Globe, CheckCircle } from 'lucide-react';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/jobs/${id}`)
            .then(res => setJob(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading details...</div>;
    if (!job) return <div>Job not found.</div>;

    return (
        <div>
            <Link to="/jobs" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', marginBottom: '30px' }}>
                <ArrowLeft size={16} /> Back to Listings
            </Link>

            <div className="glass-card">
                <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                    <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Briefcase size={40} color="#0f172a" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>{job.role}</h1>
                        <p style={{ fontSize: '1.2rem', color: '#6366f1', fontWeight: 600 }}>{job.company_name} • {job.package}</p>
                    </div>
                </div>

                <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                    <div>
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ marginBottom: '15px', color: '#6366f1' }}>Eligibility Criteria</h3>
                            <p style={{ color: '#cbd5e1', whiteSpace: 'pre-line' }}>{job.eligibility}</p>
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ marginBottom: '15px', color: '#6366f1' }}>Hiring Process</h3>
                            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                <p style={{ color: '#cbd5e1', whiteSpace: 'pre-line' }}>{job.hiring_process}</p>
                            </div>
                        </section>
                    </div>

                    <div>
                        <div className="glass-card" style={{ background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                            <h4 style={{ marginBottom: '20px' }}>Quick Apply</h4>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>Interested candidates can apply directly through the official link below.</p>
                            <a href={job.apply_link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                                Apply on Company Site
                            </a>
                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#10b981' }}>
                                <CheckCircle size={14} /> Verified Opportunity
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
