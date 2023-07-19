// @ts-ignore
import React from "react";

export default function Markdown({children}: { children: React.ReactNode }) {
  return (
    <article className="prose lg:prose-md">
      {children}
    </article>
  );
}
