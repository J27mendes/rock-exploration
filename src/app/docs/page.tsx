import dynamic from "next/dynamic"

const SwaggerDocs = dynamic(() => import("@/components/SwaggerDocs"), {
  ssr: false,
})

export default function DocsPage() {
  return <SwaggerDocs />
}
