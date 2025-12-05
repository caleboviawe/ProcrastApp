import React from 'react';

const Notifications = ({ message, onClose }: { message: string; onClose: () => void }) => {
    return (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white p-4 rounded-lg shadow-xl border border-slate-700">
            {message}
            <button onClick={onClose} className="ml-3 text-violet-400 hover:text-violet-300">✖</button>
        </div>
    )
};

export default Notifications;