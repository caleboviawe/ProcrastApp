import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Shield, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden">
            <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                ProcrastApp
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="text-sm font-medium bg-white text-slate-950 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                {/* animated background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
                    <div className="absolute top-40 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight animate-fade-in-up animation-delay-100">
                        Stop Planning. <br />
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                            Start Doing.
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
                        The only task manager designed to break the cycle of procrastination.
                        Smart nudges, gamified progress, and a design that keeps you focused on what matters.
                    </p>

                    <div className="flex justify-center gap-4 animate-fade-in-up animation-delay-300">
                        <Link
                            to="/signup"
                            className="group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2"
                        >
                            Get Started Free
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* preview mockup */}
                    <div className="mt-20 relative animate-fade-in-up animation-delay-500">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl blur opacity-20"></div>
                        <div className="relative rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-2 shadow-2xl">
                            <div className="rounded-lg bg-slate-950 aspect-video flex border border-slate-800/50 overflow-hidden relative">
                                <div className="w-48 border-r border-slate-800/50 p-4 hidden md:block">
                                    <div className="w-24 h-4 bg-slate-800 rounded mb-8"></div>
                                    <div className="space-y-3">
                                        <div className="w-full h-8 bg-violet-500/10 rounded border border-violet-500/20"></div>
                                        <div className="w-full h-8 bg-transparent rounded"></div>
                                        <div className="w-full h-8 bg-transparent rounded"></div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="w-32 h-6 bg-slate-800 rounded"></div>
                                        <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
                                    </div>
                                    <div className="space-y-4">
                                        {/* fake task items */}
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-slate-800/50 bg-slate-900/50">
                                                <div className="w-5 h-5 rounded-full border-2 border-slate-700"></div>
                                                <div className="flex-1 h-4 bg-slate-800 rounded w-3/4"></div>
                                                <div className="w-16 h-4 bg-slate-800 rounded"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-violet-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Everything you need to <span className="text-violet-400">get sh*t done</span>.
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Simple, powerful, and designed to keep you moving forward.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Clock className="w-6 h-6 text-violet-400" />}
                            title="Smart Reminders"
                            description="We analyze your work patterns and nudge you exactly when you're most likely to procrastinate."
                        />
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-indigo-400" />}
                            title="Streak Protection"
                            description="Miss a day? No problem. Freeze your streak and get back on track without the guilt trip."
                        />
                        <FeatureCard
                            icon={<CheckCircle className="w-6 h-6 text-fuchsia-400" />}
                            title="Visual Progress"
                            description="Watch your tasks turn into completed pixels. Satisfying animations make finishing work addictive."
                        />
                    </div>

                    <div className="mt-16 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-violet-500/5 blur-3xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-5xl font-bold text-white mb-2">15+ Hours</h3>
                            <p className="text-violet-300 font-medium mb-4">Saved Per Week</p>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Our users report reclaiming over 15 hours of lost time every week by simply following our "Brutal Accountability" metrics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-slate-950 border-t border-slate-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-200">ProcrastApp</span>
                    </div>
                    <p className="text-slate-500 text-sm">
                        © 2025 ProcrastApp Inc. Stop reading this footer and go do something.
                    </p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 transition-all group">
        <div className="mb-4 bg-slate-800/50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
