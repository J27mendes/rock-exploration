"use client"

type Props = {
  children: React.ReactNode
}

const ImageComponent = ({ children }: Props) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-[#1a1a1a] bg-hero-image">
      {children}
    </div>
  )
}

export default ImageComponent
