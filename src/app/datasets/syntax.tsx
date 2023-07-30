'use client'

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {tomorrow} from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SyntaxHighlight({language, children}: {
  language: string,
  children: string
}) {
  return (
    <SyntaxHighlighter customStyle={{lineHeight: "1.1", fontSize: "0.9em"}}
                       codeTagProps={{
                         style: {
                           lineHeight: "inherit",
                           fontSize: "inherit"
                         }
                       }} language={language} style={tomorrow}>
      {children}
    </SyntaxHighlighter>
  );
};
