import { useEffect, useState } from "react";

export default function EditorSide({ title, dueDate, onHome }: { title: string; dueDate: string; onHome: () => void }) {
  const [streak, setStreak] = useState(0);
  return (
    <aside className="side-menu w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4">
      <div><strong>Task:</strong> {title}</div>
      <div><strong>Due:</strong> {new Date(dueDate).toLocaleDateString()}</div>
      <div><strong>Streak:</strong> {streak} days</div>
      <button onClick={onHome} className="mt-auto px-3 py-1 bg-violet-600 hover:bg-violet-500 rounded transition">Home</button>
    </aside>
  );
}
