"use client";
import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { WikiData } from "../../types/Wiki";
import EditWikiLayout from "@/components/EditWikiLayout";

async function generateSlug(slug: string) {
  const [wikiId, isDraft] = slug.split("-");
  let wikiData: WikiData | null = null;
  try {
    const endpoint = isDraft ? "getWikiDraft" : "getWiki";
    const response = await fetch(
      `http://localhost:3000/api/${endpoint}?wikiId=${wikiId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch wiki data from ${endpoint}`);
    }
    wikiData = await response.json();
  } catch (error) {
    console.error(
      `Wiki data was null (${isDraft ? "getWikiDraft" : "getWiki"}):`,
      error
    );
  }
  return wikiData;
}

const EditWiki = ({ params }: { params: { slug: string } }) => {
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
        {
          wikiData ? <EditWikiLayout wiki={wikiData} /> : null
          // <div className="absolute inset-0 flex justify-center items-center pt-80">
          //   null
          // </div>
        }
      </div>
    </ChakraProvider>
  );
};

export default EditWiki;
