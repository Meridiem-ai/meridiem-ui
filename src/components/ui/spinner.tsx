import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

function Spinner({ className }: { className?: string }) {
  return (
    <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} data-slot="spinner" role="status" aria-label="Chargement" className={cn("size-4 animate-spin", className)} />
  )
}

export { Spinner }
