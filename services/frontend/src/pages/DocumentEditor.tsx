import { useEffect, useState, useRef } from "react";
import EditorSide from "../components/editor/EditorSide";
import EditorHeader from "../components/editor/EditorHeader";
import EditorDoc from "../components/editor/EditorDoc";
import EditorFooter from "../components/editor/EditorFooter";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/docs";

export default function DocumentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`, { withCredentials: true });
        const doc = res.data;
        setEditorContent(doc.content);
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

  // Auto-save every 10s
  useEffect(() => {
  }, [editorContent, sessionTime]);

  const saveDocument = async () => {
  };

  const goHome = async () => {
    await saveDocument();
    navigate("/document-selection");
  };

  const download = () => {
  };

  const goToSettings = () => navigate("/settings");
  const wordCount = 0;

  return (
    <div className="editor-container flex flex-col min-h-screen bg-slate-950 text-slate-50">
      <EditorHeader
        onSave={saveDocument}
        onDownload={download}
        onSettings={goToSettings}
      />

      <div className="flex flex-1 overflow-hidden">
        <EditorSide title={title} dueDate={dueDate} onHome={goHome} />
        <div className="flex-1 p-4 overflow-auto">
          <EditorDoc value={editorContent} onChange={setEditorContent} />
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
