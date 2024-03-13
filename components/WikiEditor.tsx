import React, { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import { Button } from "./ui/button";

const WikiEditor: React.FC = () => {
  const [components, setComponents] = useState<
    Array<{ type: "markdown" | "code"; key: number }>
  >([]);

  const addMarkdownEditor = () => {
    setComponents([...components, { type: "markdown", key: Date.now() }]);
  };

  const addCodeEditor = () => {
    setComponents([...components, { type: "code", key: Date.now() }]);
  };

  return (
    <div className="py-4">
      <div className="flex gap-4 mb-4">
        <Button onClick={addMarkdownEditor}>Add Markdown Editor</Button>
        <Button onClick={addCodeEditor}>Add Code Snippet</Button>
        <Button>Preview Wiki</Button>
      </div>
      <div className="overflow-auto max-h-screen">
        {components.map((component) => {
          switch (component.type) {
            case "markdown":
              return (
                <MarkdownEditor
                  key={component.key}
                  initialMarkdownText=""
                  isEditingProp={true}
                />
              );
            case "code":
              return (
                <div key={component.key} className="aspect-w-4 aspect-h-3 p-4">
                  <CodeEditor initialCode="# Start coding here..." />
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
