import Logo from "../Logo";
import { Settings, Download, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditorHeader({ onSave, onDownload, onSettings }: { onSave: () => void; onDownload: () => void; onSettings: () => void }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 py-4 backdrop-blur-lg border-b border-white/5 w-full">
      <div className="container px-4 mx-auto flex justify-between items-center">

        <div className="flex items-center flex-shrink-0">
          <Logo  className="h-14 w-auto drop-shadow-lg"/>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onSave} className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:border-violet-500 hover:text-violet-300 transition-all">
            <Save size={16}/>
            Save
          </button>

          <button onClick={onDownload} className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:border-fuchsia-500 hover:text-fuchsia-300 transition-all">
            <Download size={16}/>
            Download
          </button>

          <button onClick={onSettings} className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:border-violet-500 hover:text-violet-300 transition-all">
            <Settings size={16}/>
            Settings
          </button>

          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 border border-slate-700 text-slate-200 px-3 py-1 rounded-lg hover:border-slate-500 hover:text-slate-300 transition-all">
            <ArrowLeft size={16}/>
            Back
          </button>
        </div>
      </div>
    </header>
  );
}
