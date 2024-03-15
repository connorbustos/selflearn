"use client";
import { WikiData } from "@/app/types/Wiki";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";

interface WikiLayoutProps {
  wikiData: WikiData;
}

const WikiLayout = ({ wikiData }: WikiLayoutProps) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="max-w-6xl mx-auto my-10 px-4 pt-4 pb-4 bg-white shadow-md rounded-lg">
        {/*{JSON.stringify(wikiData)}*/}
        <h1 className="w-fit text-7xl mx-auto">&#8620; {wikiData.name}</h1>
        <div className="flex flex-col items-center gap-y-6 justify-center">
          {wikiData.content.map((item, index) => {
            if (item.isCode) {
              return (
                <div key={index} className="w-full md:max-w-4xl shadow-md">
                  <CodeEditor initialCode={item.data} />
                </div>
              );
            } else {
              return (
                <MarkdownEditor
                  key={index}
                  initialMarkdownText={item.data}
                  isEditingProp={false}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default WikiLayout;
