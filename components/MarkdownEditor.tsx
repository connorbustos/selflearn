"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";

interface MarkdownEditorProps {
  initialMarkdownText: string;
  isEditingProp: boolean;
  isOwner?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialMarkdownText,
  isEditingProp,
  isOwner = true,
}) => {
  const [markdownText, setMarkdownText] = useState(initialMarkdownText);
  const [isEditing, setIsEditing] = useState(isEditingProp);

  const handleTextChange = (event: any) => {
    setMarkdownText(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleSave = () => {
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
              className={`w-fit ${isOwner ? "inherit" : "hidden"}`}
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
          <Button className="w-fit" onClick={handleSave}>
            Save Markdown
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default MarkdownEditor;
