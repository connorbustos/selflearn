"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import { WikiContent } from "@/app/types/Wiki";

interface MarkdownEditorProps {
  markdownId?: string;
  initialMarkdownText: string;
  isEditingProp: boolean;
  isOnViewWiki: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  markdownId,
  initialMarkdownText,
  isEditingProp,
  isOnViewWiki = true,
}) => {
  const [markdownText, setMarkdownText] = useState(initialMarkdownText);
  const [isEditing, setIsEditing] = useState(isEditingProp);

  const { content, setContent } = useWikiDataStore();

  const handleTextChange = (event: any) => {
    setMarkdownText(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleSave = () => {
    const existingContent = content.find((item) => item.id === markdownId);

    if (existingContent) {
      const existingContentIndex = content.indexOf(existingContent);
      const updatedContent = [...content];
      updatedContent[existingContentIndex].data = markdownText;
      setContent(updatedContent);
    } else {
      const newContent: WikiContent = {
        id: markdownId ?? "",
        type: "markdown",
        data: markdownText ?? "",
      };
      setContent([...content, newContent]);
    }

    setIsEditing(false); // Switch to view mode
  };

  // markdown requires prose: https://stackoverflow.com/questions/75706164/problem-with-tailwind-css-when-using-the-react-markdown-component

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-full max-w-7xl gap-y-2">
        {!isEditing ? (
          <div className="flex flex-col items-center justify-center">
            <div className="prose lg:prose-base p-4 w-full md:max-w-4xl">
              <ReactMarkdown>{markdownText}</ReactMarkdown>
            </div>
            <Button
              type="button"
              className={`w-fit ${isOnViewWiki ? "hidden" : "inherit"}`}
              onClick={handleEdit}
            >
              Edit Markdown
            </Button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row border-solid border-2 rounded-md">
            <textarea
              className="md:w-1/2 p-4 resize-none outline-none border-r border-gray-300"
              value={markdownText}
              onChange={handleTextChange}
              placeholder="Write some markdown..."
            />
            <div className="md:w-1/2 p-4 overflow-auto">
              <div className="prose lg:prose-base">
                <ReactMarkdown>{markdownText}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
        {isEditing ? (
          <Button type="button" className="w-fit" onClick={handleSave}>
            Save Markdown
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default MarkdownEditor;
