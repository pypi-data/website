import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SWRProvider } from "./swr-provider";
import NavBar from "./navbar";
import React, { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PyPI Data",
  description: "PyPI code explorable on Github",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SWRProvider>
        <body className={inter.className}>
          <NavBar />
          <div className="container mx-auto p-2">
            <Suspense fallback={<></>}>{children}</Suspense>
          </div>
          <div className="divider"></div>
          <footer className="footer bottom-0 footer-center p-0 bg-base-100 text-base-content">
            <div>
              <p>
                <a href={"https://tomforb.es"}>Created by Tom Forbes</a> (
                <a href={"mailto:tom@tomforb.es"}>email contact</a>) .{" "}
                <a href={"https://github.com/pypi-data/website/"}>Source code</a>
              </p>
            </div>
          </footer>
        </body>
      </SWRProvider>
    </html>
  );
}
