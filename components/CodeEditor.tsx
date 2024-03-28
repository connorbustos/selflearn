import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  initialCode: string;
  isOwner?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  isOwner = true,
}) => {
  const [code, setCode] = useState(initialCode);

  // if isOwner is false, the Editor shouldn't be editable.

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
