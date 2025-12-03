import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import Logo from '../components/Logo';
import { useAppContext } from '../authServices/helper'

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
        } catch (err) {
            const e = err as AxiosError<{ message?: string }>;
            setError(e.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setError('');
            setLoading(true);
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const res = await axios.post('http://localhost:8000/api/auth/google', {
                    googleId: userInfo.data.sub,
                    email: userInfo.data.email,
                    name: userInfo.data.name
                });
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                navigate('/dashboard');
            } catch (err) {
                const e = err as AxiosError<{ message?: string }>;
                setError(e.response?.data?.message || 'Google sign-in failed.');
            } finally {
                setLoading(false);
            }
        },
        onError: () => setError('Google sign-in failed.')
    });

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

                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t border-slate-700"></div>
                    <span className="px-4 text-sm text-slate-500">or</span>
                    <div className="flex-1 border-t border-slate-700"></div>
                </div>

                <button
                    type="button"
                    onClick={() => googleLogin()}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 py-3 rounded-lg font-medium transition-all border border-gray-300"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                </button>

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
