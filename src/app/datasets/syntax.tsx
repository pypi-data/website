"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import shell from "react-syntax-highlighter/dist/esm/languages/prism/shell-session";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("shell", shell);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("sql", sql);

export default function SyntaxHighlight({ language, children }: { language: string; children: string | string[] }) {
  return (
    <SyntaxHighlighter
      customStyle={{ lineHeight: "1.1", fontSize: "0.9em" }}
      codeTagProps={{
        style: {
          lineHeight: "inherit",
          fontSize: "inherit",
        },
      }}
      language={language}
      style={tomorrow}
    >
      {children}
    </SyntaxHighlighter>
  );
}
