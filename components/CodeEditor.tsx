import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import CodeRunner from "./CodeRunner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import { WikiContent } from "@/app/types/Wiki";
import { Trash2 } from "lucide-react";

const LINE_HEIGHT = 20;
const MIN_EDITOR_HEIGHT = 100;
const MAX_EDITOR_HEIGHT = 800;

interface CodeEditorProps {
  codeId?: string;
  initialCode: string;
  isOwner?: boolean;
  onDelete?: () => void;
}

const languages = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
];

const CodeEditor: React.FC<CodeEditorProps> = ({
  codeId,
  initialCode,
  isOwner = true,
  onDelete,
}) => {
  const [code, setCode] = useState(initialCode);
  const [editable, setEditable] = useState(true);
  const [language, setLanguage] = useState(languages[0].value);
  const [editorHeight, setEditorHeight] = useState("100px"); // Default height

  const { content, setContent } = useWikiDataStore();

  const existingContent = content.find((item: any) => item.id === codeId);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? "");
    const lineCount = (value ?? "").split("\n").length;
    const calculatedHeight = Math.min(
      Math.max(lineCount * LINE_HEIGHT, MIN_EDITOR_HEIGHT),
      MAX_EDITOR_HEIGHT
    );
    setEditorHeight(`${calculatedHeight}px`);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const handleIsEditableChange = () => {
    setEditable(!editable);
  };

  const handleSave = () => {
    if (existingContent) {
      const existingContentIndex = content.indexOf(existingContent);
      const updatedContent = [...content];
      updatedContent[existingContentIndex].data = code;

      if (updatedContent[existingContentIndex].language !== language) {
        updatedContent[existingContentIndex].language = language;
      }
      setContent(updatedContent);
    } else {
      const newContent: WikiContent = {
        id: codeId ?? "",
        type: "code",
        language: language,
        data: code ?? "",
      };
      setContent([...content, newContent]);
    }
  };

  useEffect(() => {
    handleSave();
  }, [code]);

  return (
    <div className="flex flex-col w-full">
      <div className="mb-1">
        <Editor
          height={editorHeight}
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleEditorChange}
          options={{ readOnly: !editable }}
        />
        <div className="flex items-center mb-2">
          <Switch checked={editable} onCheckedChange={handleIsEditableChange} />
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
      <div className="border-t border-gray-200 py-2">
        <CodeRunner code={code}></CodeRunner>
      </div>
      <div className={`w-10 ${onDelete === undefined ? "hidden" : "flex"}`}>
        <Button onClick={onDelete}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default CodeEditor;
