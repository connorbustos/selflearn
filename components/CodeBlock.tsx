import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

// copied from https://gist.github.com/ilyazub/e58245ad6e76ddd9f0f221b7e4870398
interface CodeBlockProps {
  value: string;
  language?: string;
}

const customStyle = {
  ...dracula,
  hljs: {
    ...dracula.hljs,
    fontSize: "16px",
    width: "100%",
    border: "none",
  },
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={customStyle}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
