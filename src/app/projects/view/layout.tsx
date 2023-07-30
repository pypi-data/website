import React, {Suspense} from "react";

function ProjectFallback() {
  return <>Loading</>
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<ProjectFallback/>}>
      {children}
    </Suspense>
  )
}
