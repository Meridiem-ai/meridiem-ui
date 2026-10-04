/* Briques de mise en page du kit (titre de section, cadre de démonstration). */
import { cn } from "@/lib/utils"

export function KitSection({ id, title, desc, children }: { id: string; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-8 flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-3xl">{title}</h2>
        {desc ? <p className="max-w-prose text-sm text-muted-foreground">{desc}</p> : null}
      </div>
      {children}
    </section>
  )
}

export function Demo({ label, className, children, bare }: { label?: string; className?: string; children: React.ReactNode; bare?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {label ? <span className="eyebrow">{label}</span> : null}
      <div className={cn(bare ? "" : "rounded-xl border bg-card p-5 shadow-soft", className)}>{children}</div>
    </div>
  )
}
