import { useState } from "react";

interface LLMResponse {
  id?: string;
  error?: string;
  result?: any;
}

export const useLLM = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const postPrompt = async (prompt: string): Promise<LLMResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: { prompt } }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post prompt");
      }

      const data = await response.json();
      console.log("Data from API call:", data);
      return { result: data };
    } catch (err) {
      setError(
        `Failed to send prompt: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      return { error: err instanceof Error ? err.message : String(err) };
    } finally {
      setLoading(false);
    }
  };

  const getResult = async (predictionId: string): Promise<LLMResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          mode: "no-cors",
          method: "GET",
          headers: {
            Authorization: `Bearer r8_2u9Q6Db8Oib8QAX5w6eqDN3dqW9n0mH0ntIwR`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to get result");
      }

      const data = await response.json();
      console.log("DATA FROM GET: ", data);
      return { result: data.output };
    } catch (err) {
      setError(
        `Failed to fetch result: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      return { error: err instanceof Error ? err.message : String(err) };
    } finally {
      setLoading(false);
    }
  };

  return { postPrompt, getResult, loading, error };
};
