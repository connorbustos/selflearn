"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "../../css/MarkdownEditor.module.css";

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState(
    `# Welcome to Our Markdown Editor!
  
  This intuitive Markdown Editor is specifically designed for educators, students, and content creators who are passionate about crafting engaging and interactive learning materials. Our editor simplifies the process of creating well-structured documents, notes, and online content that can enhance the learning experience.
  
  ## Key Features
  
  - **Live Preview**: Instantly see how your markdown transforms into beautifully formatted text, making it easier to edit and refine your content.
  - **Syntax Highlighting**: Code blocks are highlighted to improve readability, perfect for technical tutorials or programming courses.
  - **Easy Formatting**: Use simple markdown syntax to apply bold, italics, headers, lists, and more to your text, without the need for complex HTML or CSS.
  - **Embed Images & Links**: Enrich your materials with images and links to external resources, providing a more immersive learning experience.
  
  ## How to Use
  
  1. **Write Markdown**: Start typing your markdown content in the left pane. Use markdown syntax to format your text.
  2. **Preview Your Content**: As you type, the right pane will display a live preview of your formatted content.
  3. **Edit & Refine**: Click the "Edit" button to make changes. Your edits will be reflected in real-time in the preview pane.
  4. **Save Your Work**: Once you're satisfied, hit the "Save" button to keep your changes.`
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = (event: any) => {
    setMarkdownText(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleSave = () => {
    setIsEditing(false); // Switch to view mode
  };

  return (
    <div className={styles.container}>
      {!isEditing ? (
        <div className={styles.markdownView}>
          <ReactMarkdown>{markdownText}</ReactMarkdown>
          <button onClick={handleEdit} className={styles.editButton}>
            Edit Markdown
          </button>
        </div>
      ) : (
        <div className={styles.editorContainer}>
          <textarea
            className={styles.textarea}
            value={markdownText}
            onChange={handleTextChange}
            placeholder="Write some markdown..."
          />
          <div className={styles.markdown}>
            <ReactMarkdown>{markdownText}</ReactMarkdown>
          </div>
        </div>
      )}
      {isEditing ? <button onClick={handleSave}>Save Markdown</button> : null}
    </div>
  );
};

export default MarkdownEditor;
