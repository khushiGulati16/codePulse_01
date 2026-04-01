import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Briefcase, BookOpen, Rocket } from 'lucide-react';

const Home = () => {
    const features = [
        { icon: <Briefcase size={32} />, title: 'Job Portal', desc: 'Find your dream job at top product companies.', link: '/jobs', color: '#6366f1' },
        { icon: <BookOpen size={32} />, title: 'Preparation', desc: 'Curated materials for Aptitude, DSA, and Technical rounds.', link: '/resources', color: '#10b981' },
        { icon: <Code size={32} />, title: 'Coding Judge', desc: 'Solve real-world coding problems and test your skills.', link: '/problems', color: '#a855f7' }
    ];

    return (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 800 }}
            >
                Ignite Your Tech Career with <span style={{ color: '#6366f1' }}>CodePulse</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 40px' }}
            >
                The core platform to practice data structures and algorithms. Solve problems, submit code, and track your progress with our integrated online judge.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}
            >
                <div style={{ maxWidth: '800px', width: '100%' }}>
                    <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                        <div style={{ color: '#a855f7', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><Code size={64} /></div>
                        <h2 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>Basic Online Judge</h2>
                        <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '30px' }}>
                            Support for Python and C++ with real-time execution results.
                            Build your coding foundation one challenge at a time.
                        </p>
                        <Link to="/problems" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                            Start Solving <Rocket size={18} />
                        </Link>
                    </div>
                </div>
            </motion.div>

            <div style={{ marginTop: '80px' }}>
                <Link to="/register" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', borderRadius: '50px' }}>
                    Get Started Now <Rocket size={20} style={{ marginLeft: '10px', verticalAlign: 'middle' }} />
                </Link>
            </div>
        </div>
    );
};

export default Home;
