"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface CodeRunnerProps {
  code: string;
}

// TODO: add language as a prop, 71 is the default for python 3.
const CodeRunner: React.FC<CodeRunnerProps> = ({ code }) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // TODO: make a method for creating the body based on the user input.
  const runCode = async () => {
    setIsLoading(true);
    // Create Submission
    try {
      const submissionResponse = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          method: "POST",
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST!,
            "content-type": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_code: code,
            // stdin: "SnVkZ2Uw",
            language_id: 71,
          }),
        }
      );
      const submissionResult = await submissionResponse.json();
      const token = submissionResult.token;
      // GET Submission
      const resultResponse = await fetch(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_HOST!,
          },
        }
      );
      const result = await resultResponse.json();
      setOutput(result.stdout);
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error running code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={runCode} disabled={isLoading} className="mb-2">
        Run Code
      </Button>
      <div className="p-4 border rounded-lg bg-gray-50 max-h-64 overflow-y-auto">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div>
            <span className="font-bold">Output:</span>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeRunner;
