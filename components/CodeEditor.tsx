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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import { WikiContent } from "@/app/types/Wiki";

interface CodeEditorProps {
  codeId?: string;
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
  codeId,
  initialCode,
  isOwner = true,
}) => {
  const [code, setCode] = useState(initialCode);
  const [editable, setEditable] = useState(true);
  const [language, setLanguage] = useState(languages[0].value);
  const [disableButton, setDisableButton] = useState(false);

  const { content, setContent } = useWikiDataStore();

  const existingContent = content.find((item: any) => item.id === codeId);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? "");
    setDisableButton(false);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setDisableButton(false);
  };

  const handleIsEditableChange = () => {
    setEditable(!editable);
    setDisableButton(false);
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
      setDisableButton(true);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-1">
        <Editor
          height="400px"
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
        <Button
          type={"button"}
          onClick={handleSave}
          variant={disableButton ? "disabled" : "default"}
          className={"mt-2"}
        >
          Save Changes
        </Button>
      </div>
      <div className="border-t border-gray-200 py-2">
        <CodeRunner code={code}></CodeRunner>
      </div>
    </div>
  );
};

export default CodeEditor;
