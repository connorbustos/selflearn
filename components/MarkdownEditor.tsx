"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  initialMarkdownText: string;
  isEditingProp: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialMarkdownText,
  isEditingProp,
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
      <div className="w-full max-w-7xl p-4">
        {!isEditing ? (
          <div className="flex flex-col items-center justify-center">
            <div className="prose lg:prose-base p-4 w-full md:max-w-4xl">
              <ReactMarkdown>{markdownText}</ReactMarkdown>
            </div>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={handleEdit}
            >
              Edit Markdown
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
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
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleSave}
          >
            Save Markdown
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default MarkdownEditor;
