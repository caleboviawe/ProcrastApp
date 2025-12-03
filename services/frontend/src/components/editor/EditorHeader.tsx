export default function EditorHeader({ onSave, onDownload, onSettings }: { onSave: () => void; onDownload: () => void; onSettings: () => void }) {
  return (
    <header className="header flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="logo text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
        ProcrastApp
      </div>

      <div className="actions flex gap-2">
        <button onClick={onSave} className="px-3 py-1 bg-violet-600 hover:bg-violet-500 rounded transition">Save</button>
        <button onClick={onDownload} className="px-3 py-1 bg-fuchsia-600 hover:bg-fuchsia-500 rounded transition">Download</button>
        <button onClick={onSettings} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition">Settings</button>
      </div>
    </header>
  );
}
