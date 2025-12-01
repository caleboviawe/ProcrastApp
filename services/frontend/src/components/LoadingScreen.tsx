export default function LoadingScreen() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <style>{`
                .loader {
                    width: 48px;
                    height: 48px;
                    display: inline-block;
                    position: relative;
                    background-color: #FFF;
                    background: radial-gradient(ellipse at center, #8b5cf6 0%, #8b5cf6 14%, #FFF 15%, #FFF 100%);
                    background-size: cover;
                    background-position: center;
                    border-radius: 50%;
                }
                .loader::after,
                .loader::before {
                    content: '';  
                    position: absolute;
                    height: 16px;
                    width: 4px;
                    background: #8b5cf6;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) rotate(0deg);
                    transform-origin: 25% 0;
                    box-sizing: border-box;
                    animation: rotation 10s linear infinite;
                }
                .loader::before {
                    height: 22px;
                    width: 2px;
                    transform: translateX(-50%) rotate(0deg);
                    animation-duration: 1s;
                } 
                @keyframes rotation {
                    0%    { transform: rotate(0deg); }
                    100%  { transform: rotate(360deg); }
                }
            `}</style>
            <div className="flex flex-col items-center gap-4">
                <span className="loader"></span>
                <p className="text-slate-400 text-sm">Loading...</p>
            </div>
        </div>
    );
}
