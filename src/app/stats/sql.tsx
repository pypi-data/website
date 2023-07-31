'use client'

import SyntaxHighlight from "@/app/datasets/syntax";
import {useState} from "react";

export default function ShowSQL({sqlData}: { sqlData: string }) {
    const [expandSQL, setExpandSQL] = useState(false);
    return (
        <div className="card">
            <div className="card-body pt-2 pb-1">
                <button className={"text-sm"} onClick={() => setExpandSQL(!expandSQL)}>{expandSQL ? "Hide SQL" : "Show SQL"}</button>
                {expandSQL && (
                    <SyntaxHighlight language="sql">
                        {`-- https://github.com/pypi-data/data/\n\n${sqlData}`}
                    </SyntaxHighlight>
                )}
            </div>
        </div>
    )
}
