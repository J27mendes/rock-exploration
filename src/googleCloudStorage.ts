import { Storage } from "@google-cloud/storage"
import path from "path"

const serviceAccountPath = path.join(
  process.cwd(),
  "immuniedbcarteirinha-584d3aa73e4c.json"
)

const storage = new Storage({
  keyFilename: serviceAccountPath,
})

const bucket = storage.bucket("rock-exploration")

export { bucket as storage }
