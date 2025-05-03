import { storage } from "@/googleCloudStorage"

export async function deleteFileGCS(url: string) {
  try {
    const bucketName = storage.name
    const filePath = decodeURIComponent(new URL(url).pathname).replace(
      `/${bucketName}/`,
      ""
    )
    await storage.file(filePath).delete()
  } catch (err) {
    console.error("Erro ao deletar arquivo do GCS:", err)
  }
}
