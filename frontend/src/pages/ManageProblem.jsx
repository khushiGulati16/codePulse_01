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
}