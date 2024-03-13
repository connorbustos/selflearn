import React, { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";

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
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={addMarkdownEditor}
        >
          Add Markdown Editor
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={addCodeEditor}
        >
          Add Code Snippet
        </button>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          {/* This will switch to view mode */}
          Switch to View
        </button>
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
