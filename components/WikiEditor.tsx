import React, { useEffect, useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import { Button } from "./ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import Link from "next/link";
import { WikiContent } from "@/app/types/Wiki";
import { v4 as uuidv4 } from "uuid";

const WikiEditor: React.FC = () => {
  const { content } = useWikiDataStore();
  const [components, setComponents] = useState<Array<WikiContent>>(content);

  const addMarkdownEditor = () => {
    setComponents([...components, { id: uuidv4(), type: "markdown" }]);
  };

  const addCodeEditor = () => {
    setComponents([...components, { id: uuidv4(), type: "code" }]);
  };

  useEffect(() => {
    console.log(components);
  }, [components]);

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
        {components.map((component) => {
          switch (component.type) {
            case "markdown":
              return (
                <MarkdownEditor
                  key={component.id}
                  markdownId={component.id ?? ""}
                  initialMarkdownText={""}
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
                    initialCode={"# Start coding here..."}
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
