/* Table de données (TanStack Table + shadcn) : recherche, tri, sélection, actions groupées, actions par ligne, pagination. */
import { useState } from "react"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type RowSelectionState, type SortingState } from "@tanstack/react-table"
import { ArrowUpDownIcon, MoreHorizontalIcon, Search01Icon, Mail01Icon, Archive02Icon, ViewIcon, Add01Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Icon, StatusBadge } from "@/components/meridiem/brand"
import { CLIENTS, type Client } from "@/components/meridiem/demo-data"

const eur = (n: number) => (n ? n.toLocaleString("fr-BE") + " €" : "-")
const STATUS: Record<Client["status"], "ok" | "info" | "warn"> = { Actif: "ok", Prospect: "info", "En pause": "warn" }

export function ClientsTable({ onNewRequest, pageSize = 6 }: { onNewRequest?: () => void; pageSize?: number }) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "revenue", desc: true }])
  const [selection, setSelection] = useState<RowSelectionState>({})
  const [filter, setFilter] = useState("")
  const sortHead = (label: string) => ({ column }: { column: { toggleSorting: (d: boolean) => void; getIsSorted: () => false | "asc" | "desc" } }) => (
    <button className="eyebrow inline-flex items-center gap-1 hover:text-foreground" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {label}<Icon icon={ArrowUpDownIcon} size={12} />
    </button>
  )
  const columns: ColumnDef<Client>[] = [
    {
      id: "select",
      header: ({ table }) => <Checkbox aria-label="Tout sélectionner" checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />,
      cell: ({ row }) => <Checkbox aria-label="Sélectionner" checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />,
      enableSorting: false,
    },
    { accessorKey: "name", header: sortHead("Client"), cell: ({ row }) => <div><div className="font-medium">{row.original.name}</div><div className="text-xs text-muted-foreground">{row.original.contact}</div></div> },
    { accessorKey: "city", header: () => <span className="eyebrow">Ville</span>, cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span> },
    { accessorKey: "sector", header: () => <span className="eyebrow">Secteur</span>, cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span> },
    { accessorKey: "requests", header: sortHead("Demandes"), cell: ({ getValue }) => <span className="num">{getValue<number>()}</span> },
    { accessorKey: "revenue", header: sortHead("Chiffre 2026"), cell: ({ getValue }) => <span className="num whitespace-nowrap">{eur(getValue<number>())}</span> },
    { accessorKey: "status", header: () => <span className="eyebrow">Statut</span>, cell: ({ getValue }) => <StatusBadge status={STATUS[getValue<Client["status"]>()]}>{getValue<string>()}</StatusBadge> },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label="Actions"><Icon icon={MoreHorizontalIcon} /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => toast(row.original.name, { description: "Ouverture de la fiche client (démo)" })}><Icon icon={ViewIcon} />Voir la fiche</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onNewRequest?.()}><Icon icon={Add01Icon} />Nouvelle demande</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast.success("Brouillon créé", { description: `Mail à ${row.original.contact}` })}><Icon icon={Mail01Icon} />Écrire au contact</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => toast(`${row.original.name} archivé`, { action: { label: "Annuler", onClick: () => {} } })}><Icon icon={Archive02Icon} />Archiver</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
  const table = useReactTable({
    data: CLIENTS, columns, state: { sorting, rowSelection: selection, globalFilter: filter },
    onSortingChange: setSorting, onRowSelectionChange: setSelection, onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(), getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })
  const nSel = table.getFilteredSelectedRowModel().rows.length
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <InputGroup className="sm:w-72">
          <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
          <InputGroupInput placeholder="Rechercher un client" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </InputGroup>
        {nSel > 0 && (
          <div className="ml-auto flex items-center gap-2 rounded-lg border bg-card px-2 py-1 text-sm shadow-soft animate-in fade-in-0 slide-in-from-top-1">
            <span className="px-1"><span className="num">{nSel}</span> sélectionné{nSel > 1 ? "s" : ""}</span>
            <Button size="xs" variant="outline" onClick={() => toast.success(`${nSel} brouillons de mail créés`)}><Icon icon={Mail01Icon} size={12} />Écrire</Button>
            <Button size="xs" variant="ghost" onClick={() => setSelection({})}>Désélectionner</Button>
          </div>
        )}
      </div>
      <Card className="gap-0 overflow-hidden py-0 shadow-soft">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((h) => <TableHead key={h.id} className="h-10 first:w-10 first:pl-4">{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</TableHead>)}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                {row.getVisibleCells().map((c) => <TableCell key={c.id} className="py-2.5 first:pl-4">{flexRender(c.column.columnDef.cell, c.getContext())}</TableCell>)}
              </TableRow>
            )) : (
              <TableRow><TableCell colSpan={columns.length} className="h-28 text-center text-sm text-muted-foreground">Aucun client ne correspond à « {filter} ».</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Page <span className="num">{table.getState().pagination.pageIndex + 1}</span> sur <span className="num">{table.getPageCount()}</span> · <span className="num">{table.getFilteredRowModel().rows.length}</span> clients</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Précédent</Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Suivant</Button>
        </div>
      </div>
    </div>
  )
}
