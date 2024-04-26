import { useState, useEffect } from "react";

export const useGetAllWikis = () => {
  const [wikis, setWikis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        const response = await fetch("/api/getAllWikis", { cache: "no-cache" });
        if (!response.ok) {
          throw new Error("Failed to fetch learning materials");
        }
        const data = await response.json();
        setWikis(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningMaterials();
  }, []);

  return { wikis, isLoading, error };
};
