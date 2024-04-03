import React, { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import { Button } from "./ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import Link from "next/link";

const WikiEditor: React.FC = () => {
  const [components, setComponents] = useState<
    Array<{ type: "markdown" | "code"; key: number }>
  >([]);

  const { content } = useWikiDataStore();

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
        <Link href={"/view_wiki"}>
          <Button>Preview Wiki</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-y-4 overflow-auto max-h-screen">
        {content.map((data) => {
          switch (data.type) {
            case "code":
              return (
                <div
                  key={content.indexOf(data)}
                  className="aspect-w-4 aspect-h-3 p-4 mt-0 border-2 border-solid border-gray-300 rounded-md"
                >
                  <CodeEditor initialCode={data.data} />
                </div>
              );

            case "markdown":
              return (
                <MarkdownEditor
                  key={content.indexOf(data)}
                  initialMarkdownText={data.data}
                  isEditingProp={true}
                  isOnViewWiki={false}
                />
              );
            default:
              return null;
          }
        }) ?? null}

        {components.map((component) => {
          switch (component.type) {
            case "markdown":
              return (
                <MarkdownEditor
                  key={component.key}
                  initialMarkdownText={""}
                  isEditingProp={true}
                  isOnViewWiki={false}
                />
              );
            case "code":
              return (
                <div
                  key={component.key}
                  className="aspect-w-4 aspect-h-3 p-4 mt-0 border-2 border-solid border-gray-300 rounded-md"
                >
                  <CodeEditor initialCode={"# Start coding here..."} />
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
