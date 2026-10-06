"use client"
/* Clients : indicateurs + table de données. */
import { Add01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/meridiem/brand"
import { KpiCard } from "@/components/meridiem/kpi-card"
import { ClientsTable } from "@/components/meridiem/clients-table"

export default function Clients({ onNewRequest }: { onNewRequest: () => void }) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-[2rem] leading-tight">Clients</h1>
          <p className="text-sm text-muted-foreground">Vos comptes, leur activité et ce que l'assistant a fait pour eux.</p>
        </div>
        <Button size="sm" onClick={onNewRequest}><Icon icon={Add01Icon} />Nouvelle demande</Button>
      </div>
      <section className="stagger grid gap-4 sm:grid-cols-3">
        <KpiCard label="Clients actifs" value="7" note="sur 10 comptes" kind="rings" />
        <KpiCard label="Chiffre 2026" value="193 390 €" note="+12 % sur un an" kind="line" />
        <KpiCard label="Devis envoyés" value="64" note="dont 41 signés" kind="stack" />
      </section>
      <ClientsTable onNewRequest={onNewRequest} />
    </>
  )
}
