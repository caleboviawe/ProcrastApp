import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { features } from '../constants';

import landingBg from '../assets/landing-bg-3.jpg';

const LandingPage = () => {

    return (
        <div
            className="min-h-screen font-sans text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden"
            style={{
                backgroundImage: `url(${landingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <nav className="sticky top-0 z-50 py-4 backdrop-blur-lg border-b border-white/5">
                <div className="container px-4 mx-auto relative lg:text-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center flex-shrink-0">
                            <Link to="/" className="flex items-center drop-shadow-lg">
                                <Logo className="h-14 w-auto" />
                            </Link>
                        </div>
                        <div className="flex justify-center space-x-4 items-center">
                            <Link to="/login" className="py-2 px-4 text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-[#6366F1] hover:bg-[#5558DD] text-white py-2 px-4 rounded-full transition-all text-sm font-medium"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-20 min-h-screen flex flex-col items-center justify-center">



                <div className="w-full px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-8 leading-tight animate-fade-in-up animation-delay-[0.1s]">
                        <span className="text-white block mb-2 md:mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Turn Tasks Into</span>
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
                            Achievements.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-[0.2s] leading-relaxed drop-shadow-md font-medium">
                        Your ultimate task manager designed to help you conquer assignments, build lasting habits,
                        and celebrate every win along the way.
                    </p>

                    <div className="flex justify-center gap-6 animate-fade-in-up animation-delay-[0.3s] mb-20">
                        <Link
                            to="/signup"
                            className="group bg-[#6366F1] hover:bg-[#5558DD] text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 flex items-center gap-2"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>


                    <div className="max-w-5xl mx-auto relative animate-fade-in-up animation-delay-[0.5s] mt-16 lg:mt-24">






                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-[2rem] blur opacity-20"></div>
                        <div className="relative rounded-[2rem] bg-[#0F1219]/80 border border-white/10 backdrop-blur-xl p-2 md:p-4 shadow-2xl">
                            <div className="rounded-3xl bg-[#0B0E14] aspect-[16/9] flex border border-white/5 overflow-hidden relative">
                                {/* Sidebar */}
                                <div className="w-20 md:w-64 border-r border-white/5 p-4 md:p-6 hidden sm:flex flex-col gap-6">
                                    <div className="w-full h-8 bg-white/5 rounded-lg animate-pulse"></div>
                                    <div className="space-y-3">
                                        <div className="w-full h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-lg"></div>
                                        <div className="w-full h-10 bg-white/5 rounded-lg"></div>
                                        <div className="w-full h-10 bg-white/5 rounded-lg"></div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 p-6 md:p-10">
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="w-32 md:w-48 h-8 bg-white/5 rounded-lg"></div>
                                        <div className="w-10 h-10 bg-white/5 rounded-full"></div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Progress Item 1 */}
                                        <div className="group relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                                                    <Flame size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full w-3/4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-6 bg-white/5 rounded text-xs flex items-center justify-center text-slate-400">75%</div>
                                            </div>
                                        </div>

                                        {/* Progress Item 2 */}
                                        <div className="group relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                    <div className="w-5 h-5 rounded-full border-2 border-current"></div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full w-1/2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"></div>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-6 bg-white/5 rounded text-xs flex items-center justify-center text-slate-400">50%</div>
                                            </div>
                                        </div>

                                        {/* Progress Item 3 */}
                                        <div className="group relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                                    <div className="w-5 h-5 rounded-full border-2 border-current border-dashed"></div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full w-1/4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-6 bg-white/5 rounded text-xs flex items-center justify-center text-slate-400">25%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-24">
                <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                            Easily build <span className="text-[#6366F1]">your productivity</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors">
                                <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-white/10 text-white shadow-lg shadow-indigo-500/10">
                                    {/* Clone element to increase size */}
                                    <div className="scale-125 transform">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3">{feature.text}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
