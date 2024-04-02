import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface CodeEditorProps {
  initialCode: string;
  isOwner?: boolean;
}

const languages = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
];

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  isOwner = true,
}) => {
  const [code, setCode] = useState(initialCode);
  const [editable, setEditable] = useState(true);
  const [language, setLanguage] = useState(languages[0].value);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? "");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <div>
      <Editor
        height="400px"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={handleEditorChange}
        options={{ readOnly: !editable }}
      />
      <div className="flex items-center mb-2">
        <Switch
          checked={editable}
          onCheckedChange={() => setEditable(!editable)}
        />
        <span className="ml-2 align-middle">Editable</span>
      </div>
      <Select
        onValueChange={handleLanguageChange}
        defaultValue={languages[0].value}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((currentLanguage) => (
            <SelectItem
              key={currentLanguage.value}
              value={currentLanguage.value}
            >
              {currentLanguage.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CodeEditor;
