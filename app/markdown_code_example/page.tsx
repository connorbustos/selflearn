"use client";
import React, { useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import CodeEditor from "@/components/CodeEditor";

const MarkdownEditor_Page = () => {
  const templateText = `# Welcome to Our EBook Editor!
  
  This EBook Editor is specifically designed for educators, students, and content creators who are passionate about crafting engaging and interactive learning materials. Our editor simplifies the process of creating well-structured documents, notes, and online content that can enhance the learning experience.
  
  ## Key Features
  
  - **Live Preview**: Instantly see how your markdown transforms into beautifully formatted text, making it easier to edit and refine your content.
  - **Syntax Highlighting**: Code blocks are highlighted to improve readability, perfect for technical tutorials or programming courses.
  - **Easy Formatting**: Use simple markdown syntax to apply bold, italics, headers, lists, and more to your text, without the need for complex HTML or CSS.
  - **Embed Images & Links**: Enrich your materials with images and links to external resources, providing a more immersive learning experience.
  
  ## How to Use
  
  1. **Write Markdown**: Start typing your markdown content in the left pane. Use markdown syntax to format your text.
  2. **Preview Your Content**: As you type, the right pane will display a live preview of your formatted content.
  3. **Edit & Refine**: Click the "Edit" button to make changes. Your edits will be reflected in real-time in the preview pane.
  4. **Save Your Work**: Once you're satisfied, hit the "Save" button to keep your changes.`;
  // markdown requires prose: https://stackoverflow.com/questions/75706164/problem-with-tailwind-css-when-using-the-react-markdown-component

  const reactCounterCodeSnippet = `const [count, setCount] = useState(0);`;
  const [code, setCode] = useState(reactCounterCodeSnippet);

  return (
    <div className="flex flex-col items-center">
      <MarkdownEditor
        initialMarkdownText={templateText}
        isEditingProp={false}
        isOnViewWiki={false}
      />
      <div className="w-full max-w-7xl px-4 py-8">
        <CodeEditor initialCode={code} />
      </div>
    </div>
  );
};

export default MarkdownEditor_Page;
