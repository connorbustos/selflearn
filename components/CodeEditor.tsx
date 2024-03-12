import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  initialCode: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? "");
  };

  return (
    <div>
      <Editor
        height="200px"
        defaultLanguage="python"
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
