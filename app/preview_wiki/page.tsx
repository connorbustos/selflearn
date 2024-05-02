"use client";
import WikiLayout from "@/components/WikiLayout";
import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { WikiData } from "../types/Wiki";
import { useWikiDataStore } from "@/store/wikiData.store";
import { useSession } from "next-auth/react";
import { motion, useScroll, useSpring } from "framer-motion";

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
      <motion.div className="w-full h-full flex py-4 px-4 items-center">
        {wikiData ? (
          <WikiLayout wikiData={wikiData} />
        ) : (
          <div className="m-auto">
            <Spinner />
          </div>
        )}
      </motion.div>
    </ChakraProvider>
  );
};

export default PreviewWiki;
