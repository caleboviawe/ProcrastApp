import { useEffect, useRef, useState } from "react";

type EditorDocProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function EditorDoc({ value, onChange, placeholder = "Start typing your assignment here..." }: EditorDocProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!value);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== value) {
      editor.innerHTML = value;
      setIsEmpty(value === "");
    }
  }, [value]);

  const execCommand = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
    const html = editorRef.current?.innerHTML || "";
    setIsEmpty(html === "");
    onChange(html);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const html = (e.target as HTMLDivElement).innerHTML;
    setIsEmpty(html === "" || html === "<br>");
    onChange(html);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center gap-2 flex-wrap bg-gray-800 p-2 rounded-lg shadow-md">
        <button className="text-white font-bold px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => execCommand("bold")}>B</button>
        <button className="text-white italic px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => execCommand("italic")}>I</button>
        <button className="text-white underline px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => execCommand("underline")}>U</button>
        <button className="text-white line-through px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => execCommand("strikeThrough")}>S</button>
        <button className="text-white px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => execCommand("justifyLeft")}>Left</button>
        <button className="text-white px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => execCommand("justifyCenter")}>Center</button>
        <button className="text-white px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => execCommand("justifyRight")}>Right</button>
        <button className="text-white px-3 py-1 bg-gray-700 rounded hover:bg-gray-600" onClick={() => execCommand("removeFormat")}>Clear Formatting</button>
      </div>

      <div className="relative">
        {isEmpty && (
          <div className="absolute top-6 left-6 pointer-events-none text-slate-500 select-none">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          className="editor-doc w-full h-[75vh] p-6 rounded-lg border border-slate-600 bg-slate-200 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner transition overflow-auto"
          contentEditable
          onInput={handleInput}
          suppressContentEditableWarning={true}
        />
      </div>
    </div>
  );
}
