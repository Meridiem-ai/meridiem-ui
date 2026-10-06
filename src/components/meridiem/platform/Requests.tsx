"use client"
/* Demandes : filtres, table, détail ; valider (confirmation puis toast), modifier (panneau latéral). */
import { useMemo, useState } from "react"
import { Search01Icon, PencilEdit02Icon, Tick02Icon, Download01Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Icon, StatusBadge } from "@/components/meridiem/brand"
import type { Request } from "@/components/meridiem/demo-data"

const FILTERS = [
  { id: "all", label: "Toutes", test: () => true },
  { id: "wait", label: "À valider", test: (r: Request) => r.status === "wait" || r.status === "crit" },
  { id: "ok", label: "Traitées", test: (r: Request) => r.status === "ok" },
  { id: "warn", label: "Bloquées", test: (r: Request) => r.status === "warn" },
]

export default function Requests({ rows, setRows }: { rows: Request[]; setRows: React.Dispatch<React.SetStateAction<Request[]>> }) {
  const [filter, setFilter] = useState("wait")
  const [q, setQ] = useState("")
  const visible = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter)!
    return rows.filter((r) => f.test(r) && (r.title + r.client + r.id).toLowerCase().includes(q.toLowerCase()))
  }, [rows, filter, q])
  const [selId, setSelId] = useState(rows[0]?.id)
  const sel = rows.find((r) => r.id === selId) || visible[0] || rows[0]
  const [confirm, setConfirm] = useState(false)
  const [sending, setSending] = useState(false)
  const [edit, setEdit] = useState(false)
  const [lines, setLines] = useState([{ label: "Bocal 370 ml TO70", qty: 12000, price: 0.62 }, { label: "Couvercle TO70 doré", qty: 12000, price: 0.1 }])
  const total = lines.reduce((a, l) => a + l.qty * l.price, 0)
  const eur = (n: number) => n.toLocaleString("fr-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"

  const send = () => {
    setSending(true)
    setTimeout(() => {
      setRows((rs) => rs.map((r) => (r.id === sel.id ? { ...r, status: "ok", label: "Traitée", amount: r.amount || eur(total) } : r)))
      setSending(false); setConfirm(false)
      toast.success("Devis envoyé à " + sel.contact, { description: `${sel.client} · ${eur(total)} HTVA`, action: { label: "Annuler", onClick: () => setRows((rs) => rs.map((r) => (r.id === sel.id ? { ...r, status: "wait", label: "À valider" } : r))) } })
    }, 900)
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-[2rem] leading-tight">Demandes</h1>
          <p className="text-sm text-muted-foreground">Mails, appels et formulaires, triés et préparés par l'assistant.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast.success("Export prêt", { description: "demandes-octobre-2026.xlsx" })}><Icon icon={Download01Icon} />Exporter</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            {FILTERS.map((f) => <TabsTrigger key={f.id} value={f.id}>{f.label} <span className="num text-muted-foreground">{rows.filter(f.test).length}</span></TabsTrigger>)}
          </TabsList>
        </Tabs>
        <InputGroup className="ml-auto sm:w-72">
          <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
          <InputGroupInput placeholder="Client, objet, référence" value={q} onChange={(e) => setQ(e.target.value)} />
        </InputGroup>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="gap-0 overflow-hidden py-0 shadow-soft">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="eyebrow h-10 pl-4">Demande</TableHead>
                <TableHead className="eyebrow hidden md:table-cell">Type</TableHead>
                <TableHead className="eyebrow hidden md:table-cell">Reçue</TableHead>
                <TableHead className="eyebrow text-right">Montant</TableHead>
                <TableHead className="eyebrow">Statut</TableHead>
                <TableHead className="eyebrow hidden pr-4 md:table-cell">Suivi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.length === 0 && (
                <TableRow><TableCell colSpan={6} className="h-32 text-center text-sm text-muted-foreground">Aucune demande dans ce filtre. <button className="underline underline-offset-4" onClick={() => { setFilter("all"); setQ("") }}>Tout afficher</button></TableCell></TableRow>
              )}
              {visible.map((r) => (
                <TableRow key={r.id} data-state={sel?.id === r.id ? "selected" : undefined} onClick={() => setSelId(r.id)} className="cursor-pointer animate-in fade-in-0">
                  <TableCell className="py-3 pl-4">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.id} · {r.client}</div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">{r.type}</TableCell>
                  <TableCell className="hidden font-mono text-xs whitespace-nowrap text-muted-foreground md:table-cell">{r.at}</TableCell>
                  <TableCell className="num text-right whitespace-nowrap">{r.amount || <span className="text-muted-foreground">-</span>}</TableCell>
                  <TableCell><StatusBadge status={r.status}>{r.label}</StatusBadge></TableCell>
                  <TableCell className="hidden pr-4 md:table-cell"><Avatar className="size-7"><AvatarFallback className="bg-secondary text-[11px]">{r.owner}</AvatarFallback></Avatar></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {sel && (
          <Card key={sel.id} className="gap-4 shadow-soft animate-in fade-in-0 slide-in-from-right-2 lg:sticky lg:top-4">
            <CardHeader>
              <CardDescription className="font-mono text-xs">{sel.id}</CardDescription>
              <CardTitle className="text-xl">{sel.title}</CardTitle>
              <CardAction><StatusBadge status={sel.status}>{sel.label}</StatusBadge></CardAction>
              <p className="col-span-2 text-xs text-muted-foreground">{sel.client} · {sel.contact} · reçue {sel.at.startsWith("hier") || sel.at.startsWith("à ") ? sel.at : "aujourd'hui à " + sel.at}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow">Demande du client</span>
                <blockquote className="border-l-2 pl-3 text-sm text-muted-foreground">Bonjour, pourriez-vous nous faire une offre pour 12 000 bocaux 370 ml avec couvercles twist-off 70 mm, livrés début novembre à Waremme ? Merci, Marc</blockquote>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow">Devis préparé par l'assistant</span>
                <div className="divide-y divide-dashed text-sm">
                  {lines.map((l) => <div key={l.label} className="flex justify-between gap-3 py-1.5"><span>{l.label} · {l.qty.toLocaleString("fr-BE")} × {l.price.toLocaleString("fr-BE", { minimumFractionDigits: 2 })} €</span><span className="num whitespace-nowrap">{eur(l.qty * l.price)}</span></div>)}
                  <div className="flex justify-between gap-3 py-1.5 font-medium"><span>Total HTVA</span><span className="num">{eur(total)}</span></div>
                </div>
              </div>
              <p className="flex gap-2 text-xs text-muted-foreground"><Icon icon={Tick02Icon} size={14} className="mt-0.5 text-ok" />Prix catalogue 2026, remise volume de 5 %. Stock disponible pour une livraison en semaine 45.</p>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-2">
              {sel.status === "ok" ? (
                <p className="rounded-lg bg-ok/8 px-3 py-2 text-center text-sm text-ok">Traitée : le client a reçu la réponse.</p>
              ) : (
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setConfirm(true)}>Valider et envoyer le devis</Button>
                  <Button variant="outline" onClick={() => setEdit(true)}><Icon icon={PencilEdit02Icon} />Modifier</Button>
                </div>
              )}
              <p className="text-center text-xs text-muted-foreground">Rien ne part chez le client sans votre validation.</p>
            </CardFooter>
          </Card>
        )}
      </div>

      <AlertDialog open={confirm} onOpenChange={(o) => !sending && setConfirm(o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-2xl font-normal">Envoyer le devis à {sel?.contact} ?</AlertDialogTitle>
            <AlertDialogDescription>{sel?.client} recevra le devis de {eur(total)} HTVA par mail, depuis votre adresse. Vous pourrez annuler pendant quelques secondes.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={sending}>Revenir</AlertDialogCancel>
            <AlertDialogAction onClick={(e) => { e.preventDefault(); send() }} disabled={sending}>{sending ? <><Spinner />Envoi…</> : "Envoyer le devis"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={edit} onOpenChange={setEdit}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-heading text-2xl font-normal">Modifier le devis</SheetTitle>
            <SheetDescription>{sel?.client} · {sel?.id}. L'assistant retient vos corrections pour les prochains devis.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-6 px-4">
            {lines.map((l, i) => (
              <FieldGroup key={i} className="gap-3 rounded-lg border p-3">
                <Field><FieldLabel>Article</FieldLabel><Input value={l.label} onChange={(e) => setLines((ls) => ls.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field><FieldLabel>Quantité</FieldLabel><Input type="number" value={l.qty} onChange={(e) => setLines((ls) => ls.map((x, j) => (j === i ? { ...x, qty: Number(e.target.value) } : x)))} /></Field>
                  <Field><FieldLabel>Prix unitaire (€)</FieldLabel><Input type="number" step="0.01" value={l.price} onChange={(e) => setLines((ls) => ls.map((x, j) => (j === i ? { ...x, price: Number(e.target.value) } : x)))} /></Field>
                </div>
              </FieldGroup>
            ))}
            <div className="flex justify-between border-t pt-3 text-sm font-medium"><span>Total HTVA</span><span className="num">{eur(total)}</span></div>
          </div>
          <SheetFooter>
            <Button onClick={() => { setEdit(false); toast.success("Devis mis à jour", { description: `Nouveau total : ${eur(total)} HTVA` }) }}>Enregistrer</Button>
            <Button variant="outline" onClick={() => setEdit(false)}>Annuler</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
