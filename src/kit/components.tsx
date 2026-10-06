/* Composants : actions, formulaires, statuts, navigation, retours et superpositions. */
import { useEffect, useState } from "react"
import { Add01Icon, Download01Icon, PencilEdit02Icon, Delete02Icon, Settings02Icon, Mail01Icon, InformationCircleIcon, Alert02Icon, Tick02Icon, MoreHorizontalIcon, Copy01Icon, Archive02Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Kbd } from "@/components/ui/kbd"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { fr } from "react-day-picker/locale"
import { Icon, StatusBadge } from "@/components/meridiem/brand"
import { KitSection, Demo } from "./parts"

export function Actions() {
  const [loading, setLoading] = useState(false)
  return (
    <KitSection id="actions" title="Actions" desc="Un seul bouton terracotta par zone. Les actions secondaires sont en contour, les actions discrètes en fantôme, la suppression en rouge et toujours confirmée.">
      <Demo label="Variantes"><div className="flex flex-wrap items-center gap-2">
        <Button><Icon icon={Add01Icon} />Action principale</Button><Button variant="outline">Secondaire</Button><Button variant="secondary">Tertiaire</Button>
        <Button variant="ghost">Discrète</Button><Button variant="link">Lien</Button><Button variant="destructive"><Icon icon={Delete02Icon} />Supprimer</Button>
      </div></Demo>
      <div className="grid gap-5 md:grid-cols-2">
        <Demo label="Tailles et icônes"><div className="flex flex-wrap items-center gap-2">
          <Button size="xs">Très petit</Button><Button size="sm">Petit</Button><Button>Normal</Button><Button size="lg">Grand</Button>
          <Button size="icon" variant="outline" aria-label="Réglages"><Icon icon={Settings02Icon} /></Button>
          <Button variant="outline">Continuer<Icon icon={ArrowRight01Icon} /></Button>
        </div></Demo>
        <Demo label="États et groupes"><div className="flex flex-wrap items-center gap-2">
          <Button disabled={loading} onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); toast.success("Enregistré") }, 1200) }}>{loading ? <><Spinner />Enregistrement…</> : "Cliquer pour charger"}</Button>
          <Button disabled>Désactivé</Button>
          <ButtonGroup>
            <Button variant="outline"><Icon icon={PencilEdit02Icon} />Modifier</Button>
            <Button variant="outline"><Icon icon={Download01Icon} />Exporter</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline" size="icon" aria-label="Plus"><Icon icon={MoreHorizontalIcon} /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end"><DropdownMenuItem><Icon icon={Copy01Icon} />Dupliquer</DropdownMenuItem><DropdownMenuItem><Icon icon={Archive02Icon} />Archiver</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive"><Icon icon={Delete02Icon} />Supprimer</DropdownMenuItem></DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div></Demo>
      </div>
    </KitSection>
  )
}

export function Forms() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 8))
  return (
    <KitSection id="formulaires" title="Formulaires" desc="Un libellé au-dessus de chaque champ, une aide en dessous si nécessaire, une erreur qui dit comment corriger.">
      <div className="grid gap-5 md:grid-cols-2">
        <Demo label="Champs">
          <FieldGroup>
            <Field><FieldLabel htmlFor="k-name">Nom du client</FieldLabel><Input id="k-name" placeholder="Brasserie du Condroz" /></Field>
            <Field><FieldLabel htmlFor="k-amount">Montant</FieldLabel><InputGroup><InputGroupInput id="k-amount" defaultValue="8 640,00" className="num" /><InputGroupAddon align="inline-end"><InputGroupText>€ HTVA</InputGroupText></InputGroupAddon></InputGroup></Field>
            <Field data-invalid="true"><FieldLabel htmlFor="k-mail">Adresse mail</FieldLabel><Input id="k-mail" aria-invalid defaultValue="marc.lejeune@" /><FieldError>Il manque le nom de domaine, par exemple marc@brasserie.be</FieldError></Field>
            <Field><FieldLabel htmlFor="k-type">Type de demande</FieldLabel><Select defaultValue="devis"><SelectTrigger id="k-type" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="devis">Devis</SelectItem><SelectItem value="commande">Commande</SelectItem><SelectItem value="reclamation">Réclamation</SelectItem></SelectContent></Select></Field>
            <Field><FieldLabel htmlFor="k-msg">Message</FieldLabel><Textarea id="k-msg" placeholder="Votre message au client" /><FieldDescription>L'assistant propose un texte que vous pouvez modifier.</FieldDescription></Field>
          </FieldGroup>
        </Demo>
        <div className="flex flex-col gap-5">
          <Demo label="Choix">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2"><Checkbox id="k-c1" defaultChecked /><Label htmlFor="k-c1">Envoyer une copie au commercial</Label></div>
              <div className="flex items-center gap-2"><Checkbox id="k-c2" /><Label htmlFor="k-c2">Joindre les conditions générales</Label></div>
              <RadioGroup defaultValue="vous" className="flex gap-4"><div className="flex items-center gap-2"><RadioGroupItem value="vous" id="k-r1" /><Label htmlFor="k-r1">Vouvoiement</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="tu" id="k-r2" /><Label htmlFor="k-r2">Tutoiement</Label></div></RadioGroup>
              <div className="flex items-center justify-between gap-3 rounded-lg border p-3"><div><div className="text-sm font-medium">Résumé quotidien</div><div className="text-xs text-muted-foreground">Chaque matin à 8 h</div></div><Switch defaultChecked onCheckedChange={(v) => toast(v ? "Activé" : "Désactivé")} /></div>
            </div>
          </Demo>
          <Demo label="Date" className="flex justify-center"><Calendar mode="single" selected={day} onSelect={setDay} locale={fr} defaultMonth={new Date(2026, 9, 1)} /></Demo>
        </div>
      </div>
    </KitSection>
  )
}

export function Statuses() {
  return (
    <KitSection id="statuts" title="Statuts et badges" desc="Une pastille dit une seule chose, la même partout, et porte toujours son mot.">
      <Demo><div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2"><StatusBadge status="ok">Traitée</StatusBadge><StatusBadge status="wait">À valider</StatusBadge><StatusBadge status="warn">Bloquée</StatusBadge><StatusBadge status="crit">Urgent</StatusBadge><StatusBadge status="info">En cours</StatusBadge><StatusBadge status="neutral">Classée</StatusBadge></div>
        <div className="flex flex-wrap gap-2"><Badge>Nouveau</Badge><Badge variant="secondary">Devis</Badge><Badge variant="outline">Brouillon</Badge><Badge variant="outline" className="num">12</Badge><Badge variant="destructive">Échec d'envoi</Badge></div>
        <div className="flex items-center gap-3 text-sm"><div className="flex -space-x-2">{["JR", "TB", "SL", "IA"].map((a) => <Avatar key={a} className="size-8 border-2 border-card"><AvatarFallback className={a === "IA" ? "bg-primary text-[10px] text-primary-foreground" : "bg-secondary text-[10px]"}>{a}</AvatarFallback></Avatar>)}</div><span className="text-muted-foreground">Avatars empilés : équipe et assistant (IA)</span></div>
      </div></Demo>
    </KitSection>
  )
}

export function Navigation() {
  return (
    <KitSection id="navigation" title="Navigation et en-têtes" desc="Fil d'Ariane, en-tête de page avec ses actions, onglets, sélecteur segmenté, pagination.">
      <Demo label="En-tête de page" className="flex flex-col gap-4">
        <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#kit">Lambert Emballages</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#kit">Clients</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Brasserie du Condroz</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h3 className="font-heading text-3xl">Brasserie du Condroz</h3><p className="text-sm text-muted-foreground">Client depuis 2023 · Marc Lejeune · 31 demandes</p></div>
          <div className="flex gap-2"><Button variant="outline" size="sm"><Icon icon={Mail01Icon} />Écrire</Button><Button size="sm"><Icon icon={Add01Icon} />Nouvelle demande</Button></div>
        </div>
      </Demo>
      <div className="grid gap-5 md:grid-cols-2">
        <Demo label="Onglets">
          <Tabs defaultValue="a">
            <TabsList><TabsTrigger value="a">Demandes <span className="num text-muted-foreground">31</span></TabsTrigger><TabsTrigger value="b">Devis</TabsTrigger><TabsTrigger value="c">Notes</TabsTrigger></TabsList>
            <TabsContent value="a" className="pt-3 text-sm text-muted-foreground">Les 31 demandes de ce client, de la plus récente à la plus ancienne.</TabsContent>
            <TabsContent value="b" className="pt-3 text-sm text-muted-foreground">Les devis envoyés et leur état de signature.</TabsContent>
            <TabsContent value="c" className="pt-3 text-sm text-muted-foreground">Ce que l'équipe et l'assistant savent de ce client.</TabsContent>
          </Tabs>
          <Tabs defaultValue="a" className="mt-5">
            <TabsList variant="line"><TabsTrigger value="a">Vue d'ensemble</TabsTrigger><TabsTrigger value="b">Activité</TabsTrigger><TabsTrigger value="c">Documents</TabsTrigger></TabsList>
          </Tabs>
        </Demo>
        <Demo label="Segmenté et pagination" className="flex flex-col items-start gap-5">
          <ToggleGroup type="single" defaultValue="30" variant="outline"><ToggleGroupItem value="7">7 jours</ToggleGroupItem><ToggleGroupItem value="30">30 jours</ToggleGroupItem><ToggleGroupItem value="90">90 jours</ToggleGroupItem></ToggleGroup>
          <Pagination className="mx-0 justify-start"><PaginationContent>
            <PaginationItem><PaginationPrevious href="#kit" text="Précédent" /></PaginationItem><PaginationItem><PaginationLink href="#kit">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#kit" isActive>2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#kit">3</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationNext href="#kit" text="Suivant" /></PaginationItem>
          </PaginationContent></Pagination>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">Raccourci <Kbd>⌘</Kbd><Kbd>K</Kbd> pour rechercher</div>
        </Demo>
      </div>
    </KitSection>
  )
}

export function Feedback() {
  const [p, setP] = useState(18)
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setInterval(() => setP((v) => (v >= 100 ? 18 : v + 9)), 600); return () => clearInterval(t) }, [])
  return (
    <KitSection id="retours" title="Retours et superpositions" desc="Chaque clic produit un effet visible : un toast, une fenêtre, un panneau, un chargement. Essayez les boutons.">
      <div className="grid gap-5 md:grid-cols-2">
        <Demo label="Toasts"><div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => toast.success("Devis envoyé à Marc Lejeune", { description: "Brasserie du Condroz · 8 640,00 € HTVA" })}>Succès</Button>
          <Button variant="outline" onClick={() => toast("Relances préparées", { description: "4 brouillons dans Outlook" })}>Information</Button>
          <Button variant="outline" onClick={() => toast("Client archivé", { action: { label: "Annuler", onClick: () => toast.success("Archivage annulé") } })}>Avec annulation</Button>
          <Button variant="outline" onClick={() => toast.error("Envoi impossible", { description: "La boîte Outlook est déconnectée. Reconnectez-la dans Réglages." })}>Erreur</Button>
          <Button variant="outline" onClick={() => toast.promise(new Promise((r) => setTimeout(r, 1500)), { loading: "Préparation du devis…", success: "Devis prêt", error: "Échec" })}>En cours puis fait</Button>
        </div></Demo>
        <Demo label="Fenêtres et panneaux"><div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline">Fenêtre</Button></DialogTrigger>
            <DialogContent><DialogHeader><DialogTitle className="font-heading text-2xl font-normal">Renommer la demande</DialogTitle><DialogDescription>Le nouveau nom apparaît partout dans la plateforme.</DialogDescription></DialogHeader><Input defaultValue="Devis 12 000 bocaux 370 ml" /><DialogFooter><Button>Enregistrer</Button></DialogFooter></DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline">Confirmation</Button></AlertDialogTrigger>
            <AlertDialogContent><AlertDialogHeader><AlertDialogTitle className="font-heading text-2xl font-normal">Supprimer ce brouillon ?</AlertDialogTitle><AlertDialogDescription>Le brouillon de relance à Confiturerie Gérard sera supprimé d'Outlook. Cette action est définitive.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Garder</AlertDialogCancel><AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={() => toast("Brouillon supprimé")}>Supprimer</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
          </AlertDialog>
          <Sheet>
            <SheetTrigger asChild><Button variant="outline">Panneau latéral</Button></SheetTrigger>
            <SheetContent><SheetHeader><SheetTitle className="font-heading text-2xl font-normal">Fiche client</SheetTitle><SheetDescription>Brasserie du Condroz · Ciney</SheetDescription></SheetHeader><div className="flex flex-col gap-3 px-4 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span>Marc Lejeune</span></div><div className="flex justify-between"><span className="text-muted-foreground">Chiffre 2026</span><span className="num">48 200 €</span></div><div className="flex justify-between"><span className="text-muted-foreground">Statut</span><StatusBadge status="ok">Actif</StatusBadge></div></div></SheetContent>
          </Sheet>
          <Popover>
            <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
            <PopoverContent className="w-64 text-sm"><div className="font-medium">Délai moyen</div><p className="mt-1 text-muted-foreground">Temps entre la réception d'une demande et la réponse envoyée, jours ouvrés.</p></PopoverContent>
          </Popover>
          <Tooltip><TooltipTrigger asChild><Button variant="outline">Infobulle</Button></TooltipTrigger><TooltipContent>Préparé par l'assistant à 09:12</TooltipContent></Tooltip>
          <HoverCard><HoverCardTrigger asChild><Button variant="link">Marc Lejeune</Button></HoverCardTrigger><HoverCardContent className="w-64 text-sm"><div className="font-medium">Marc Lejeune</div><div className="text-muted-foreground">Acheteur, Brasserie du Condroz</div><div className="mt-2 text-xs text-muted-foreground">Préfère les rendez-vous le matin · vouvoiement</div></HoverCardContent></HoverCard>
        </div></Demo>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Demo label="Alertes" className="flex flex-col gap-3">
          <Alert><Icon icon={InformationCircleIcon} /><AlertTitle>4 relances sont prêtes</AlertTitle><AlertDescription>Elles partiront après votre validation.</AlertDescription></Alert>
          <Alert variant="destructive"><Icon icon={Alert02Icon} /><AlertTitle>Boîte Outlook déconnectée</AlertTitle><AlertDescription>Les mails ne peuvent plus être envoyés. Reconnectez-la dans Réglages.</AlertDescription></Alert>
          <Alert className="border-ok/30 bg-ok/5 text-ok"><Icon icon={Tick02Icon} /><AlertTitle>Devis signé</AlertTitle><AlertDescription className="text-ok/80">Brasserie du Condroz a signé le devis D-2598.</AlertDescription></Alert>
        </Demo>
        <Demo label="Chargements" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2"><div className="flex justify-between text-sm"><span>Import des factures</span><span className="num text-muted-foreground">{Math.min(p, 100)} %</span></div><Progress value={Math.min(p, 100)} /></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Spinner />L'assistant prépare le devis…</div>
          <div className="flex flex-col gap-2">
            {loading ? (<><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-16 w-full" /></>) : <p className="text-sm">Contenu chargé : 12 demandes à valider.</p>}
            <Button variant="ghost" size="xs" className="self-start" onClick={() => setLoading((l) => !l)}>{loading ? "Afficher le contenu" : "Revoir le squelette"}</Button>
          </div>
        </Demo>
      </div>
    </KitSection>
  )
}
