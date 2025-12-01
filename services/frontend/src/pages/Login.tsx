import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import Logo from '../components/Logo';
import { useAppContext } from '../authServices/helper';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAppContext();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8000/api/auth/login', formData);
            // store JWT for auth
            localStorage.setItem('token', res.data.token);
            if (res.data.token) {
                try {
                    const userResponse = await axios.get(
                        "http://localhost:8000/api/auth/me",
                        {
                            headers: {
                                Authorization: `Bearer ${res.data.token}`,
                            },
                        }
                    );
                    console.log("Fetched user data:", userResponse.data);
                    setUser(userResponse.data);
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                }
            }
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans selection:bg-violet-500/30 selection:text-violet-200">
            {/* purple gradient bg */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-grid-white opacity-[0.2]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80"></div>
            </div>

            <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-800 relative z-10">
                <Link to="/" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="text-center mb-8">
                    <Logo className="h-24 w-auto mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="text-slate-400 mt-2">Sign in to continue your productivity journey</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-3 rounded-lg font-semibold shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-violet-400 font-medium hover:text-violet-300 transition-colors">
                        Sign up for free
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
