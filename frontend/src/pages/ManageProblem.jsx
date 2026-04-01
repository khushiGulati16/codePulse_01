import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import { Database, Save, ArrowLeft } from 'lucide-react';

const ManageProblem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'Easy',
        input_format: '',
        output_format: '',
        sample_input: '',
        sample_output: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            // Fetch problem to edit
            api.get(`/problems/${id}`)
                .then(res => setFormData(res.data))
                .catch(() => toast.error('Failed to load challenge details.'));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await api.put(`/admin/problems/${id}`, formData);
                toast.success('Challenge updated successfully!');
            } else {
                await api.post('/admin/problems', formData);
                toast.success('New challenge created!');
            }
            navigate('/problems');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Operation failed.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
            <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
                <ArrowLeft size={16} /> Dashboard
            </button>
            <div className="glass-card" style={{ padding: '40px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                    <Database color="#6366f1" /> {id ? 'Modify Challenge' : 'Architect New Challenge'}
                </h1>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    <div className="input-group">
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required placeholder="Problem title..." />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="input-group">
                            <label>Difficulty</label>
                            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required style={{ height: '100px' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="input-group">
                            <label>Input Format</label>
                            <textarea name="input_format" value={formData.input_format} onChange={handleChange} required style={{ height: '80px' }} />
                        </div>
                        <div className="input-group">
                            <label>Output Format</label>
                            <textarea name="output_format" value={formData.output_format} onChange={handleChange} required style={{ height: '80px' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="input-group">
                            <label>Sample Input</label>
                            <textarea name="sample_input" value={formData.sample_input} onChange={handleChange} style={{ height: '80px', fontFamily: 'monospace' }} />
                        </div>
                        <div className="input-group">
                            <label>Sample Output</label>
                            <textarea name="sample_output" value={formData.sample_output} onChange={handleChange} style={{ height: '80px', fontFamily: 'monospace' }} />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <Save size={18} /> {loading ? 'Processing...' : 'Deploy Challenge'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageProblem;

