"use client";
import WikiLayout from "@/components/WikiLayout";
import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { WikiData } from "../../types/Wiki";

async function generateSlug(slug: string) {
  const wikiId = slug;
  let wikiData: WikiData | null = null;
  try {
    const response = await fetch(`/api/getWiki?wikiId=${wikiId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch wiki data");
    }
    wikiData = await response.json();
  } catch (error) {
    console.error(error);
  }
  return wikiData;
}

const ViewWiki = ({ params }: { params: { slug: string } }) => {
  const [wikiData, setWikiData] = useState<WikiData | null>(null);
  useEffect(() => {
    const fetchWikiData = async () => {
      const data = await generateSlug(params.slug);
      setWikiData(data);
    };
    fetchWikiData();
  }, [params.slug]);
  return (
    <ChakraProvider>
      <div className="w-full py-4 px-4 content-center">
        {wikiData ? <WikiLayout wikiData={wikiData} /> : null}
      </div>
    </ChakraProvider>
  );
};

export default ViewWiki;
