"use client";
import WikiLayout from "@/components/WikiLayout";
import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { WikiData } from "../types/Wiki";
import { useWikiDataStore } from "@/store/wikiData.store";

const PreviewWiki = () => {
  const { content, title, owner } = useWikiDataStore();

  const [wikiData, setWikiData] = useState<WikiData>();

  useEffect(() => {
    const wiki: WikiData = {
      title: title,
      content: content,
      owner: owner,
    };

    setWikiData(wiki);
  }, []);

  return (
    <ChakraProvider>
      <div className="w-full py-4 px-4 content-center">
        {wikiData ? <WikiLayout wikiData={wikiData} /> : <Spinner />}
      </div>
    </ChakraProvider>
  );
};

export default PreviewWiki;
