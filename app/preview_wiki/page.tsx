"use client";
import WikiLayout from "@/components/WikiLayout";
import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { WikiData } from "../types/Wiki";
import { useWikiDataStore } from "@/store/wikiData.store";
import { useSession } from "next-auth/react";

const PreviewWiki = () => {
  const [wikiData, setWikiData] = useState<WikiData>();
  const { data: session } = useSession();

  useEffect(() => {
    const title = localStorage.getItem("title");
    const content = JSON.parse(localStorage.getItem("content") ?? "");

    const wiki: WikiData = {
      title: title ?? "",
      content: content ?? "",
      owner: session?.user?.name ?? "",
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
