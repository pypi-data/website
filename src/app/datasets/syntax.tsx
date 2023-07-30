'use client'

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SyntaxHighlight({language, content}: {language: string, content: string}) {
    return (
        <SyntaxHighlighter language={language} style={dark}>
            {content}
        </SyntaxHighlighter>
    );
};
