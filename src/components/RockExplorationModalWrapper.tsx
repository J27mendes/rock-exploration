"use client"

import React from "react"

interface RockExplorationModalWrapperProps {
  children: React.ReactNode
}

const RockExplorationModalWrapper = ({
  children,
}: RockExplorationModalWrapperProps) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-black bg-opacity-50 p-6">
        <p className="flex justify-center font-semibold text-white">
          Rock Exploration
        </p>
        {children}
      </div>
    </div>
  )
}

export default RockExplorationModalWrapper
