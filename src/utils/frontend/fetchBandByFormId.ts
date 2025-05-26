import axios from "axios"

import { Band } from "@/interfaces"

export const fetchBandByFormId = async (
  formularioId: string,
): Promise<Band> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/bands/${formularioId}`,
  )
  return res.data
}
