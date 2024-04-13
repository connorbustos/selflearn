import React, { useState, useEffect } from "react";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import { Button } from "./ui/button";
import Link from "next/link";
import { WikiContent, WikiData } from "@/app/types/Wiki";
import { FormikHelpers } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

interface WikiEditorProps {
  wiki?: WikiData;
  setFieldValue?: FormikHelpers<{
    content: Array<WikiContent>;
  }>["setFieldValue"];
}

const WikiEditor: React.FC<WikiEditorProps> = ({ wiki, setFieldValue }) => {
  const [components, setComponents] = useState<Array<WikiContent>>(
    wiki?.content || []
  );

  const { toast } = useToast();

  useEffect(() => {
    if (setFieldValue) {
      setFieldValue("content", components);
    }
  }, [components, setFieldValue]);

  const addMarkdownEditor = () => {
    setComponents([...components, { id: uuidv4(), type: "markdown" }]);
    toast({
      description: "Markdown Editor Added!",
    });
  };

  const addCodeEditor = () => {
    setComponents([...components, { id: uuidv4(), type: "code" }]);
    toast({
      description: "Code Editor Added!",
    });
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
      <Toaster />
      <div className="flex flex-col gap-y-4">
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
