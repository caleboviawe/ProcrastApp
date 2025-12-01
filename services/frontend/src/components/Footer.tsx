import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#0B0E14]/80 backdrop-blur-xl py-8">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand & Copyright */}
                    <div className="flex items-center gap-4">
                        <Logo className="h-9 w-auto" />
                        <p className="text-slate-500 text-sm">
                            © 2025 ProcrastApp
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex gap-6">
                        <Link to="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Log In</Link>
                        <Link to="/signup" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Sign Up</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
