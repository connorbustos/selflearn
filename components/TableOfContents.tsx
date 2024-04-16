"use client";
import React, { useState, useEffect } from "react";
import { marked } from "marked";

interface TableOfContentsProps {
  markdownText: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ markdownText }) => {
  const [tableOfContents, setTableOfContents] = useState([]);
  useEffect(() => {
    const renderer = new marked.Renderer();
    const newTableOfContents: any = [];
    renderer.heading = function (text, level) {
      console.log(`Heading level ${level}: ${text}`);
      const anchor = text.toLowerCase().replace(/[^\w]+/g, "-");
      newTableOfContents.push({ level, text, anchor });
      return `<h${level}>${text}</h${level}>`; // Return standard HTML for a heading
    };
    marked(markdownText, { renderer });
    setTableOfContents(newTableOfContents);
  }, [markdownText]);
  return (
    <ul className="p-4 mb-0">
      {tableOfContents.map((item: any, index) => (
        <li key={index} className={`py-1 pl-${item.level * 2} font-bold`}>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;
