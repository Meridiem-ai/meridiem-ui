/* Carte indicateur Olympe : texte à gauche, illustration animée à droite dans une boîte fixe (rien ne déborde). */
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { IsoArt, type IsoKind } from "@/components/meridiem/brand"
import { cn } from "@/lib/utils"

export function KpiCard({ label, value, note, badge, kind, art, className }: {
  label: string; value: string; note?: string; badge?: React.ReactNode; kind?: IsoKind; art?: React.ReactNode; className?: string
}) {
  const [hover, setHover] = useState(false)
  return (
    <Card
      className={cn("@container gap-0 overflow-hidden py-0 shadow-soft transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-lift", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex h-full min-h-[124px] flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm leading-snug text-muted-foreground">{label}</span>
          {badge}
        </div>
        <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="num font-heading text-[1.6rem] leading-none whitespace-nowrap @[20rem]:text-[2rem]">{value}</span>
            {note ? <span className="text-xs leading-snug text-muted-foreground">{note}</span> : null}
          </div>
          <div className="relative -mb-1 h-16 w-20 shrink-0 @[20rem]:h-20 @[20rem]:w-24">
            {kind ? <IsoArt kind={kind} active={hover} /> : art}
          </div>
        </div>
      </div>
    </Card>
  )
}
