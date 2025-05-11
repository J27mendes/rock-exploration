import { toast } from "sonner"

export const showSuccess = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "#ffffff",
      color: "##10B981",
      fontSize: 18,
    },
  })
}

export const showError = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "#ffffff",
      color: "#EF4444",
      fontSize: 18,
    },
  })
}
