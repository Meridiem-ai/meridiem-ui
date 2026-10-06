"use client"
/* Table de données générique (TanStack Table + shadcn) : recherche, tri, pagination, ligne cliquable, état vide.
   Même rendu que ClientsTable, mais les colonnes, les données et les libellés viennent de l'application.
   - `searchText` dit sur quoi porte la recherche (par défaut : toutes les valeurs texte de la ligne).
   - `toolbar` se place à gauche de la recherche (onglets de filtre, par exemple).
   - Une colonne peut porter `meta: { className: "hidden md:table-cell" }` pour se masquer sur téléphone. */
import { useState, type ReactNode } from "react"
import {
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
  type Column, type ColumnDef, type FilterFn, type SortingState,
} from "@tanstack/react-table"
import { ArrowUpDownIcon, ArrowUp01Icon, ArrowDown01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Card } from "@/components/ui/card"
import { Icon } from "@/components/meridiem/brand"
import { cn } from "@/lib/utils"

export type DataTableLabels = {
  search: string
  /** Bouton qui vide la recherche dans l'état vide */
  clear: string
  previous: string
  next: string
  /** « 12 projets », « 1 devis » */
  count: (n: number) => string
  /** « Page 1 sur 2 » */
  page: (index: number, total: number) => string
  /** Message quand rien ne correspond (q = recherche en cours, vide si aucun texte) */
  empty: (q: string) => string
}

const FR: DataTableLabels = {
  search: "Rechercher",
  clear: "Effacer la recherche",
  previous: "Précédent",
  next: "Suivant",
  count: (n) => `${n} élément${n > 1 ? "s" : ""}`,
  page: (i, n) => `Page ${i} sur ${n}`,
  empty: (q) => (q ? `Aucun résultat pour « ${q} ».` : "Rien à afficher."),
}

type Meta = { className?: string; headClassName?: string }
const meta = (c: { columnDef: { meta?: unknown } }) => (c.columnDef.meta ?? {}) as Meta

/** En-tête triable : étiquette en capitales et flèche qui dit le sens du tri. */
export function SortHeader<T>({ column, label, className }: { column: Column<T, unknown>; label: string; className?: string }) {
  const s = column.getIsSorted()
  return (
    <button
      type="button"
      className={cn("eyebrow inline-flex items-center gap-1 hover:text-foreground", className)}
      onClick={() => column.toggleSorting(s === "asc")}
      aria-label={label}
    >
      {label}
      <Icon icon={s === "asc" ? ArrowUp01Icon : s === "desc" ? ArrowDown01Icon : ArrowUpDownIcon} size={12} />
    </button>
  )
}

export function DataTable<T>({
  data, columns, searchText, toolbar, onRowClick, initialSorting = [], pageSize = 10, labels, className, getRowId, hideSearch,
}: {
  data: T[]
  columns: ColumnDef<T, any>[] // eslint-disable-line @typescript-eslint/no-explicit-any
  searchText?: (row: T) => string
  toolbar?: ReactNode
  onRowClick?: (row: T) => void
  initialSorting?: SortingState
  pageSize?: number
  labels?: Partial<DataTableLabels>
  className?: string
  getRowId?: (row: T, i: number) => string
  hideSearch?: boolean
}) {
  const L = { ...FR, ...labels }
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [filter, setFilter] = useState("")
  const globalFilterFn: FilterFn<T> = (row, _id, value) => {
    const q = String(value ?? "").trim().toLowerCase()
    if (!q) return true
    const txt = searchText ? searchText(row.original) : Object.values(row.original as Record<string, unknown>).filter((v) => typeof v === "string").join(" ")
    return txt.toLowerCase().includes(q)
  }
  const table = useReactTable({
    data, columns, getRowId,
    state: { sorting, globalFilter: filter },
    onSortingChange: setSorting, onGlobalFilterChange: setFilter, globalFilterFn,
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })
  const rows = table.getRowModel().rows
  const n = table.getFilteredRowModel().rows.length
  const pages = table.getPageCount()
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {(toolbar || !hideSearch) && (
        <div className="flex flex-wrap items-center gap-2">
          {toolbar}
          {!hideSearch && (
            <InputGroup className="w-full sm:ml-auto sm:w-72">
              <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
              <InputGroupInput type="search" aria-label={L.search} placeholder={L.search} value={filter} onChange={(e) => { setFilter(e.target.value); table.setPageIndex(0) }} />
            </InputGroup>
          )}
        </div>
      )}
      <Card className="gap-0 overflow-hidden py-0 shadow-soft">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className={cn("h-10 first:pl-4 last:pr-4", meta(h.column).className, meta(h.column).headClassName)}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={onRowClick ? (e) => { if (!(e.target as HTMLElement).closest("a,button")) onRowClick(row.original) } : undefined}
                className={cn("animate-in fade-in-0", onRowClick && "cursor-pointer")}
              >
                {row.getVisibleCells().map((c) => (
                  <TableCell key={c.id} className={cn("py-3 align-top whitespace-normal first:pl-4 last:pr-4", meta(c.column).className)}>
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-28 text-center text-sm whitespace-normal text-muted-foreground">
                  {L.empty(filter.trim())}
                  {filter && <> <button type="button" className="underline underline-offset-4 hover:text-foreground" onClick={() => setFilter("")}>{L.clear}</button></>}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <span aria-live="polite">
          {pages > 1 ? <>{L.page(table.getState().pagination.pageIndex + 1, pages)} · </> : null}
          <span className="num">{L.count(n)}</span>
        </span>
        {pages > 1 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{L.previous}</Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{L.next}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
