"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { unified } from "unified";
import markdown from "remark-parse";
import remarkToc from "remark-toc";

interface Heading {
  value: string;
  depth: number;
  id: string;
}

const MarkdownEditor: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>("");
  const [toc, setToc] = useState<Heading[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extract headings and generate TOC
    const processor = unified().use(markdown).use(remarkToc);
    const tree = processor.parse(markdownText);
    const headings: Heading[] = [];

    const findHeadings = (node: any) => {
      if (node.type === "heading") {
        headings.push({
          value: node.children[0].value,
          depth: node.depth,
          id: node.children[0].value.toLowerCase().replace(/\s+/g, "-"),
        });
      }
      if (node.children) {
        node.children.forEach(findHeadings);
      }
    };

    findHeadings(tree);
    setToc(headings);
  }, [markdownText]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  const scrollToHeading = (id: string) => {
    const element = previewRef.current?.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 p-4">
        <div className="toc">
          {toc.map((heading, index) => (
            <div
              key={index}
              className={`toc-item toc-item-${heading.depth}`}
              onClick={() => scrollToHeading(heading.id)}
            >
              {heading.value}
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-2/3 p-4">
        <textarea
          className="w-full p-4 resize-none outline-none border-r border-gray-300"
          value={markdownText}
          onChange={handleTextChange}
          placeholder="Write some markdown..."
        />
        <div className="preview" ref={previewRef}>
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
