import { X } from "lucide-react";

interface GuestSignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGuestSignIn: () => void;
    title?: string;
    message?: string;
    loading?: boolean;
}

export default function GuestSignInModal({
    isOpen,
    onClose,
    onGuestSignIn,
    title = "Make an Account",
    message = "You need to be signed in to view the editor",
    loading = false,
}: GuestSignInModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    onClick={onClose}
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Title */}
                <h3 className="text-xl font-bold text-green-500 mb-4">
                    {title}
                </h3>

                {/* Message */}
                <p className="text-slate-300 mb-6">{message}</p>

                {/* Action Button */}
                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
                    onClick={() => {
                        onGuestSignIn();
                        onClose();
                    }}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Guest Sign In"}
                </button>
            </div>
        </div>
    );
}
