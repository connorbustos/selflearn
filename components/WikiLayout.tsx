"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import { useWikiDataStore } from "@/store/wikiData.store";
import Link from "next/link";
import { WikiData } from "@/app/types/Wiki";
import { UserData } from "@/app/types/User";

interface WikiLayoutProps {
  wikiData: WikiData;
}

const WikiLayout = ({ wikiData }: WikiLayoutProps) => {
  const { title, content } = wikiData;

  return (
    <div className="w-screen">
      <div className="w-full py-4 px-4">
        <div className="w-fit sticky top-8 left-10">
          {/* <Link href={"/create_new_wiki"}>
            <Button>Edit Wiki</Button>
          </Link> */}
        </div>
        <div className="w-full h-full overflow-hidden">
          <div className="max-w-6xl mx-auto my-10 px-4 pt-4 pb-4 bg-white shadow-md rounded-lg">
            <h1 className="w-fit text-7xl mx-auto">&#8620; {title}</h1>
            <div className="flex flex-col items-center gap-y-6 justify-center">
              {content.map((item, index) => {
                if (item.type === "code") {
                  return (
                    <div key={index} className="w-full md:max-w-4xl shadow-md">
                      <CodeEditor initialCode={item.data ?? ""} />
                    </div>
                  );
                } else {
                  return (
                    <MarkdownEditor
                      isOnViewWiki={true}
                      key={index}
                      initialMarkdownText={item.data ?? ""}
                      isEditingProp={false}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiLayout;
