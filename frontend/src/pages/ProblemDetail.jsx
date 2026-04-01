import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import { ArrowLeft, Play, Send, CheckCircle2, XCircle, Info, Activity } from 'lucide-react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const ProblemDetail = () => {
    const { id } = useParams();
    const { user, token } = useAuth();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [executing, setExecuting] = useState(false);
    const [result, setResult] = useState(null);
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let newSocket;
        if (user && token) {
            newSocket = io('http://localhost:5000', {
                auth: { token }
            });
            
            newSocket.on('execution_log', (log) => {
                setLogs(prev => [...prev, log]);
            });
            
            newSocket.on('execution_complete', (data) => {
                // Keep logs for a moment then maybe clear on next submit
            });
        }
        return () => newSocket && newSocket.disconnect();
    }, [user, id]);

    useEffect(() => {
        api.get(`/problems/${id}`)
            .then(res => {
                setProblem(res.data);
                // Set default code template
                if (language === 'python') setCode('# Write your code here\nprint("Hello World")');
                else setCode('#include <iostream>\n\nint main() {\n    std::cout << "Hello World";\n    return 0;\n}');
            })
            .catch(err => {
                console.error(err);
                setError(err.response?.data?.message || 'Problem not found or API error.');
            });
    }, [id, language]);

    const handleSubmit = async () => {
        setExecuting(true);
        setResult(null);
        setLogs([]); // Clear logs for new run
        try {
            const res = await api.post('/submissions/submit', {
                problem_id: id,
                code,
                language
            });
            setResult(res.data);
            if (res.data.status === 'Accepted') {
                toast.success('Solution Accepted!');
            } else {
                toast.warning(`Status: ${res.data.status}`);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Execution failed. Check Judge0 API Key.');
        } finally {
            setExecuting(false);
        }
    };
    if (error) return <div className="glass-card" style={{ color: '#ef4444', textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}><XCircle size={40} style={{ marginBottom: '15px' }} /><br />{error}</div>;
    if (!problem) return <div>Loading...</div>;

    return (
        <div style={{ paddingBottom: '50px' }}>
            <Link to="/problems" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', marginBottom: '30px' }}>
                <ArrowLeft size={16} /> All Problems
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Left: Problem Statement */}
                <div>
                    <div className="glass-card" style={{ position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '20px', padding: '35px', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <span style={{ 
                                color: problem.difficulty === 'Easy' ? '#10b981' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444', 
                                background: problem.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.15)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                                padding: '6px 16px', 
                                borderRadius: '20px', 
                                fontSize: '0.85rem', 
                                fontWeight: 700,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                            }}>{problem.difficulty}</span>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>{problem.title}</h1>

                        <div className="content" style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                            <p style={{ marginBottom: '20px' }}>{problem.description}</p>

                            <h4 style={{ color: 'white', marginBottom: '8px' }}>Input Format</h4>
                            <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>{problem.input_format}</p>

                            <h4 style={{ color: 'white', marginBottom: '8px' }}>Output Format</h4>
                            <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>{problem.output_format}</p>

                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                                <h4 style={{ marginBottom: '10px' }}>Sample Input</h4>
                                <pre style={{ fontFamily: 'monospace', color: '#6366f1' }}>{problem.sample_input || 'None'}</pre>
                                <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Sample Output</h4>
                                <pre style={{ fontFamily: 'monospace', color: '#10b981' }}>{problem.sample_output || 'None'}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Code Editor & Results */}
                <div>
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                style={{ width: 'auto', marginBottom: '0', padding: '6px 12px', fontSize: '0.85rem' }}
                            >
                                <option value="python">Python 3</option>
                                <option value="cpp">C++ (GCC 9.2.0)</option>
                                <option value="java">Java (OpenJDK 13)</option>
                            </select>

                            <button
                                onClick={handleSubmit}
                                disabled={executing}
                                className="btn-primary"
                                style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                {executing ? 'Executing...' : <><Send size={16} /> Submit</>}
                            </button>
                        </div>

                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck="false"
                            style={{
                                width: '100%',
                                height: '400px',
                                border: 'none',
                                background: '#0a0f1e',
                                color: '#10b981',
                                fontFamily: '"Fira Code", "Source Code Pro", monospace',
                                fontSize: '14px',
                                padding: '20px',
                                resize: 'none',
                                marginBottom: '0',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* LIVE TERMINAL LOGS */}
                    {(executing || logs.length > 0) && (
                        <div className="glass-card" style={{ marginTop: '20px', background: '#020617', border: '1px solid #1e293b', padding: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                                <Activity size={18} color="#38bdf8" className={executing ? 'animate-pulse' : ''} />
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>SYSTEM EXECUTION LOGS</span>
                            </div>
                            <div style={{ maxHeight: '150px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                {logs.map((log, i) => (
                                    <div key={i} style={{ marginBottom: '6px', color: log.message.startsWith('❌') ? '#fca5a5' : log.message.startsWith('✅') ? '#86efac' : '#cbd5e1' }}>
                                        <span style={{ color: '#64748b', marginRight: '10px' }}>[{log.time}]</span>
                                        {log.message}
                                    </div>
                                ))}
                                {executing && <div style={{ color: '#38bdf8', marginTop: '10px' }}>▋ Processing...</div>}
                            </div>
                        </div>
                    )}

                    {result && (
                        <div className="glass-card" style={{ marginTop: '20px', background: result.status === 'Accepted' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                {result.status === 'Accepted' ? <CheckCircle2 color="#10b981" /> : <XCircle color="#ef4444" />}
                                <h3 style={{ color: result.status === 'Accepted' ? '#10b981' : '#ef4444' }}>{result.status}</h3>
                            </div>

                            {result.stdout && (
                                <div style={{ marginBottom: '15px' }}>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '5px' }}>Your Output:</p>
                                    <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px', fontSize: '0.9rem' }}>{result.stdout}</pre>
                                </div>
                            )}

                            {result.stderr && (
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '5px' }}>Error Details:</p>
                                    <pre style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', color: '#fca5a5' }}>{result.stderr}</pre>
                                </div>
                            )}

                            {!result.stdout && !result.stderr && result.output && (
                                <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px', fontSize: '0.9rem' }}>{result.output}</pre>
                            )}
                        </div>
                    )}

                    {!result && !executing && logs.length === 0 && (
                        <div className="glass-card" style={{ marginTop: '20px', textAlign: 'center', color: '#64748b' }}>
                            <Info size={24} style={{ marginBottom: '10px' }} />
                            <p>Run your code to see the results here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemDetail;

