import { useEffect, useState } from "react";
import EditorSide from "../components/editor/EditorSide";
import EditorHeader from "../components/editor/EditorHeader";
import EditorDoc from "../components/editor/EditorDoc";
import EditorFooter from "../components/editor/EditorFooter";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../authServices/helper";

const API_BASE = "http://localhost:8000/api/docs/editor";

export default function DocumentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  useAppContext(); // Ensures user is authenticated
  
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`, { headers });
        const doc = res.data;
        setEditorContent(doc.content || "");
        setTitle(doc.title);
        setDueDate(doc.due_date);
        setTotalTime(doc.total_time_spent || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => setSessionTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-save every 30s
  useEffect(() => {
    if (!id || loading) return;
    const timer = setTimeout(() => {
      saveDocument();
    }, 30000);
    return () => clearTimeout(timer);
  }, [editorContent]);

  const saveDocument = async () => {
    try {
      await axios.put(`${API_BASE}/${id}`, {
        content: editorContent,
        total_time_spent: totalTime + sessionTime,
      }, { headers });
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const goHome = async () => {
    await saveDocument();
    navigate("/dashboard");
  };

  const download = () => {
    const blob = new Blob([editorContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "document"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const goToSettings = () => navigate("/profile");
  const wordCount = editorContent.trim() ? editorContent.trim().split(/\s+/).length : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0E14] text-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 font-medium">Loading document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container flex flex-col min-h-screen bg-[#0B0E14] text-slate-50 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <EditorHeader
        onSave={saveDocument}
        onDownload={download}
        onSettings={goToSettings}
      />
      
      <div className="hidden md:flex flex-1 overflow-hidden">
        <EditorSide title={title} dueDate={dueDate} onHome={goHome} />
        <div className="flex-1 p-4 overflow-auto">
          <EditorDoc value={editorContent} onChange={setEditorContent} />
        </div>
      </div>
      <div className="md:hidden flex-1 flex items-center justify-center p-6 overflow-auto">
        <div className="w-full max-w-sm">
          <EditorSide title={title} dueDate={dueDate} onHome={goHome} />
        </div>
      </div>

      <EditorFooter
        wordCount={wordCount}
        sessionTime={sessionTime}
        totalTime={totalTime + sessionTime}
      />
    </div>
  );
}