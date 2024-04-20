"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLLM } from "@/hooks/useLLM";
import ReactMarkdown from "react-markdown";

const PromptSender: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const { postPrompt, loading, error } = useLLM();

  const handlePromptChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(event.target.value);
  };

  const handleSendPrompt = async () => {
    const response = await postPrompt(prompt);
    if (response.result) {
      setResult(response.result.output.join(""));
    } else {
      setResult("No result received. Check logs or try again.");
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4 mx-auto aspect-w-4 aspect-h-3 max-w-xl bg-white shadow-lg rounded">
      <Textarea
        placeholder="Enter your prompt here"
        value={prompt}
        onChange={handlePromptChange}
        className="text-base p-2 border border-gray-300 rounded-lg"
        disabled={loading}
      />
      <Button onClick={handleSendPrompt} disabled={loading}>
        {loading ? "Sending..." : "Send Prompt"}
      </Button>
      {error && (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
      {result && (
        <div className="mt-4 p-3 border rounded shadow-sm bg-white">
          <div className="prose lg:prose-base p-4 w-full md:max-w-4xl">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptSender;
