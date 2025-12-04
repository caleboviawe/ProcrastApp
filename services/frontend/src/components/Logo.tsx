import procrastAppLogo from '../assets/procrastapp-logo.png';

interface LogoProps {
    className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
    return (
        <img
            src={procrastAppLogo}
            alt="ProcrastApp"
            className={`brightness-0 invert drop-shadow-[0_0_8px_rgba(139,92,246,0.4)] ${className}`}
        />
    );
};

export default Logo;
