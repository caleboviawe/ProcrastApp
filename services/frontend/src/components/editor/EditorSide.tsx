import { Home, Calendar, FileText } from 'lucide-react';

export default function EditorSide({ title, dueDate, onHome }: any) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <aside className="w-full md:w-64 md:border-r border-white/5 bg-[#0B0E14]/60 backdrop-blur-sm flex flex-col md:min-h-0 min-h-full">
      <div className="p-6 space-y-6">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 mb-1">Document</p>
              <p className="text-sm font-semibold text-white truncate" title={title}>
                {title || 'Untitled Document'}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Calendar className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-400 mb-1">Due Date</p>
              <p className="text-sm font-semibold text-white">
                {formatDate(dueDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 hidden md:block"></div>
      <div className="p-6">
        <button
          onClick={onHome}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#6366F1] hover:bg-[#5558DD] text-white transition-all hover:scale-[1.02] shadow-lg shadow-indigo-500/20 font-medium">
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
      </div>
    </aside>
  );
}