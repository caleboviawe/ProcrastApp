export default function EditorFooter({ wordCount, sessionTime, totalTime }: { wordCount: number; sessionTime: number; totalTime: number }) {
  const format = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <footer className="footer flex justify-around items-center py-3 bg-slate-900 border-t border-slate-800 text-slate-200">
      <div>Words: {wordCount}</div>
      <div>Session: {format(sessionTime)}</div>
      <div>Total: {format(totalTime)}</div>
    </footer>
  );
}
