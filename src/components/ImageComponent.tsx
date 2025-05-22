"use client"

import { ImageComponentProps } from "@/interfaces"

const ImageComponent = ({
  children,
  notFound = false,
}: ImageComponentProps) => {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-[#1a1a1a] bg-hero-image ${notFound ? "" : "bg-hero-image"}`}
      style={
        notFound
          ? {
              backgroundImage: `url('/images/rock404exploration.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "#0d0c0c",
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}

export default ImageComponent
