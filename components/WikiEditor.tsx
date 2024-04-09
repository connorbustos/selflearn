import React, { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import { Button } from "./ui/button";
import Link from "next/link";
import { WikiContent, WikiData } from "@/app/types/Wiki";
import { v4 as uuidv4 } from "uuid";

interface WikiEditorProps {
  wiki?: WikiData;
}

const WikiEditor: React.FC<WikiEditorProps> = ({ wiki }) => {
  const [components, setComponents] = useState<Array<WikiContent>>(
    wiki?.content || []
  );

  const addMarkdownEditor = () => {
    setComponents([...components, { id: uuidv4(), type: "markdown" }]);
  };

  const addCodeEditor = () => {
    setComponents([...components, { id: uuidv4(), type: "code" }]);
  };

  return (
    <div className="py-4">
      <div className="flex gap-4 mb-4">
        <Button type="button" onClick={addMarkdownEditor}>
          Add Markdown Editor
        </Button>
        <Button type="button" onClick={addCodeEditor}>
          Add Code Snippet
        </Button>
        <Link href={"/view_wiki"}>
          <Button type="button">Preview Wiki</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-y-4 overflow-auto max-h-screen">
        {components.map((component) => {
          switch (component.type) {
            case "markdown":
              return (
                <MarkdownEditor
                  key={component.id}
                  markdownId={component.id ?? ""}
                  initialMarkdownText={component.data ?? ""}
                  isEditingProp={true}
                  isOnViewWiki={false}
                />
              );
            case "code":
              return (
                <div
                  key={component.id}
                  className="aspect-w-4 aspect-h-3 p-4 mt-0 border-2 border-solid border-gray-300 rounded-md"
                >
                  <CodeEditor
                    codeId={component.id ?? ""}
                    initialCode={component.data ?? "# Start coding here..."}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default WikiEditor;
