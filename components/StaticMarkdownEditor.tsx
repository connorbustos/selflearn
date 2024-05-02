"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { WikiContent } from "@/app/types/Wiki";
import { Table, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { useLLM } from "@/hooks/useLLM";
import CodeBlock from "./CodeBlock";

interface StaticMarkdownEditor {
  markdownId?: string;
  initialMarkdownText: string;
  isEditingProp: boolean;
  isOnViewWiki: boolean;
  onDelete?: () => void;
  isViewer?: boolean;
}

const StaticMarkdownEditor: React.FC<StaticMarkdownEditor> = ({
  markdownId,
  initialMarkdownText,
  isEditingProp,
  isOnViewWiki = true,
  onDelete,
  isViewer,
}) => {
  const [markdownText, setMarkdownText] = useState(initialMarkdownText);
  const [isEditing, setIsEditing] = useState(isEditingProp);
  const [prompt, setPrompt] = useState("");

  const [content, setContent] = useState();
  const { postPrompt, loading } = useLLM();

  const handleTextChange = (event: any) => {
    setMarkdownText(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

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
              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <CodeBlock
                        language={match[1]}
                        value={String(children).replace(/\n$/, "")}
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {markdownText}
              </ReactMarkdown>
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

export default StaticMarkdownEditor;
