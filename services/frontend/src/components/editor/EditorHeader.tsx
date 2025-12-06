import { Save, Download, Settings } from 'lucide-react';
import Logo from '../Logo';

export default function EditorHeader({ onSave, onDownload, onSettings }: any) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/5 bg-[#0B0E14]/80">
      <div className="w-full px-4 md:px-8 mx-auto">
        <div className="flex justify-between items-center py-3 relative">
          <h1 className="hidden md:block text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Document Editor
          </h1>
          
          <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mx-auto md:mx-0">
            <Logo className="h-12 md:h-16 w-auto drop-shadow-lg" />
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={onSave}
              className="flex items-center justify-center gap-2 p-2 md:px-4 md:py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all hover:scale-105 text-sm font-medium"
              title="Save"
            >
              <Save className="w-4 h-4" />
              <span className="hidden md:inline">Save</span>
            </button>
            <button
              onClick={onDownload}
              className="flex items-center justify-center gap-2 p-2 md:px-4 md:py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all hover:scale-105 text-sm font-medium"
              title="Download"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Download</span>
            </button>
            <button
              onClick={onSettings}
              className="flex items-center justify-center gap-2 p-2 md:px-4 md:py-2 rounded-full bg-[#6366F1] hover:bg-[#5558DD] text-white transition-all hover:scale-105 text-sm font-medium shadow-lg shadow-indigo-500/30"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}