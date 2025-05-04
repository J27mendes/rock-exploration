"use client"

import { RedocStandalone } from "redoc"

export default function SwaggerDocs() {
  return (
    <RedocStandalone
      specUrl="/api/docs"
      options={{
        scrollYOffset: 50,
        hideDownloadButton: false,
        theme: {
          colors: {
            primary: { main: "#1e90ff" },
          },
        },
      }}
    />
  )
}
