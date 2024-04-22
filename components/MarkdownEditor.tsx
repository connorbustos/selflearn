"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { useWikiDataStore } from "@/store/wikiData.store";
import { WikiContent } from "@/app/types/Wiki";
import { Table, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { useLLM } from "@/hooks/useLLM";

interface MarkdownEditorProps {
  markdownId?: string;
  initialMarkdownText: string;
  isEditingProp: boolean;
  isOnViewWiki: boolean;
  onDelete?: () => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  markdownId,
  initialMarkdownText,
  isEditingProp,
  isOnViewWiki = true,
  onDelete,
}) => {
  const [markdownText, setMarkdownText] = useState(initialMarkdownText);
  const [isEditing, setIsEditing] = useState(isEditingProp);
  const [prompt, setPrompt] = useState("");

  const { content, setContent } = useWikiDataStore();
  const { postPrompt, loading } = useLLM();

  const handleTextChange = (event: any) => {
    setMarkdownText(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
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
  };

  useEffect(() => {
    handleSave();
  }, [markdownText]);

  const handlePromptChange = (event: any) => {
    setPrompt(event.target.value);
  };

  const handleSendPrompt = async () => {
    const response = await postPrompt(prompt);
    if (response.result) {
      const display = response.result.output.join("");
      setMarkdownText(markdownText + display);
    } else {
      setMarkdownText(
        markdownText + " No result received. Check logs or try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col w-full gap-y-2">
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
          <>
            <Button
              type="button"
              className="w-fit"
              onClick={() => setIsEditing(false)}
            >
              View Markdown
            </Button>
            {process.env.NODE_ENV === "development" ? (
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Ask SelfLearnAI!"
                  value={prompt}
                  onChange={handlePromptChange}
                  disabled={loading}
                />
                <Button
                  type="button"
                  disabled={loading}
                  onClick={handleSendPrompt}
                >
                  Send
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
        <div className={`w-10 ${onDelete === undefined ? "hidden" : "flex"}`}>
          <Button onClick={onDelete}>
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
