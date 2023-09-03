"use client";

import { useState } from "react";

export default function ClickhouseView({
                                         queries
                                       }: {
  queries: { name: string; query: string }[];
}) {
  const [index, setIndex] = useState(0);
  const query = queries[index].query;
  const url = `https://play.clickhouse.com/play?user=play#${query}`;
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 text-center pb-5">
        {queries.map(({ name }, i) => (
          <div key={`click-${i}`}>
            <button className={"btn btn-sm btn-primary"} onClick={() => {setIndex(i)}}>{name}</button>
          </div>
        ))}
      </div>
      <iframe
        key={index}
        width={"100%"}
        height={"600px"}
        src={url}
      ></iframe>
      <div className={"text-center"}>
        <a className={"btn btn-sm btn-primary"} href={url} target="_blank">Open in new tab</a>
      </div>
    </>
  );
}
