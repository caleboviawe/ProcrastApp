import { useState } from "react";
import { X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    confirmText?: string;
    actionText: string;
    onConfirm: () => Promise<void> | void;
    loading?: boolean;
    error?: string;
}

export default function ConfirmModal({
    isOpen,
    onClose,
    title,
    message,
    confirmText,
    actionText,
    onConfirm,
    loading = false,
    error,
}: ConfirmModalProps) {
    const [inputText, setInputText] = useState("");

    if (!isOpen) return null;

    const isActionDisabled = confirmText
        ? inputText !== confirmText || loading
        : loading;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
                <button
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    onClick={() => {
                        setInputText("");
                        onClose();
                    }}
                >
                    <X className="w-6 h-6" />
                </button>

                <h3
                    className={`text-xl font-bold ${
                        confirmText ? "text-red-500" : "text-green-500"
                    } mb-4`}
                >
                    {title}
                </h3>

                <p className="text-slate-300 mb-4">{message}</p>

                {confirmText && (
                    <>
                        <p className="text-slate-400 mb-2">
                            Type{" "}
                            <span className="font-mono text-red-400">
                                {confirmText}
                            </span>{" "}
                            to confirm:
                        </p>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={`Type ${confirmText} to confirm`}
                            className="w-full p-2 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 mb-4"
                        />
                    </>
                )}

                {error && (
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center mb-4">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                        onClick={() => {
                            setInputText("");
                            onClose();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className={`flex-1 ${
                            confirmText
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                        }  text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50`}
                        onClick={async () => {
                            await onConfirm();
                            setInputText("");
                        }}
                        disabled={isActionDisabled}
                    >
                        {loading ? "Processing..." : actionText}
                    </button>
                </div>
            </div>
        </div>
    );
}
