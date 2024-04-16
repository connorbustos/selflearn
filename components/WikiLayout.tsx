"use client";
import React from "react";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import { WikiData } from "@/app/types/Wiki";
import TableOfContents from "./TableOfContents";

interface WikiLayoutProps {
  wikiData: WikiData;
}

const WikiLayout = ({ wikiData }: WikiLayoutProps) => {
  const { title, content } = wikiData;

  return (
    <div className="flex w-screen overflow-hidden lg:px-0">
      {/* Left Spacer - 20% */}
      <div className="flex-1 hidden lg:flex lg:flex-col h-screen overflow-auto sticky top-0">
        {content?.map(
          (item, index) =>
            item.type === "markdown" && (
              <TableOfContents key={index} markdownText={item.data ?? ""} />
            )
        )}
      </div>
      {/* Wiki Content - 60% */}
      <div className="flex-auto lg:flex-grow-0 lg:basis-3/5 p-4">
        <h1 className="text-7xl text-center">&#8620; {title}</h1>
        <div className="flex flex-col items-center gap-y-6">
          {content?.map((item, index) => {
            if (item.type === "code") {
              return (
                <div key={index} className="w-full shadow-md">
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
      {/* Right Spacer - 20% */}
      <div className="flex-1 hidden lg:block"></div>
    </div>
  );
};

export default WikiLayout;
