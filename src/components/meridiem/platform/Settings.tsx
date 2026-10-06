"use client"
/* Réglages (ouverts depuis le menu du compte) : profil, notifications, équipe. */
import { useState } from "react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Icon } from "@/components/meridiem/brand"

const TEAM = [
  { n: "Julie Remacle", e: "julie@lambert-emballages.be", r: "admin" },
  { n: "Thomas Bastin", e: "thomas@lambert-emballages.be", r: "membre" },
  { n: "Sarah Lambert", e: "sarah@lambert-emballages.be", r: "lecture" },
]

export default function Settings() {
  const [saving, setSaving] = useState(false)
  const save = () => { setSaving(true); setTimeout(() => { setSaving(false); toast.success("Profil enregistré") }, 700) }
  return (
    <>
      <div>
        <h1 className="font-heading text-[2rem] leading-tight">Réglages</h1>
        <p className="text-sm text-muted-foreground">Votre profil, vos notifications et votre équipe.</p>
      </div>
      <Tabs defaultValue="profil" className="max-w-3xl">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="notifs">Notifications</TabsTrigger>
          <TabsTrigger value="equipe">Équipe</TabsTrigger>
        </TabsList>

        <TabsContent value="profil" className="mt-4">
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-lg">Profil</CardTitle><CardDescription>Ces informations apparaissent dans les mails envoyés en votre nom.</CardDescription></CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field><FieldLabel htmlFor="s-name">Nom</FieldLabel><Input id="s-name" defaultValue="Julie Remacle" /></Field>
                  <Field><FieldLabel htmlFor="s-role">Fonction</FieldLabel><Input id="s-role" defaultValue="Service commercial" /></Field>
                </div>
                <Field><FieldLabel htmlFor="s-mail">Adresse mail</FieldLabel><Input id="s-mail" type="email" defaultValue="julie@lambert-emballages.be" /><FieldDescription>Les réponses des clients arrivent sur cette adresse.</FieldDescription></Field>
                <Field>
                  <FieldLabel htmlFor="s-tone">Ton des mails préparés</FieldLabel>
                  <Select defaultValue="vous"><SelectTrigger id="s-tone" className="w-full sm:w-64"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="vous">Vouvoiement, cordial</SelectItem><SelectItem value="tu">Tutoiement, direct</SelectItem></SelectContent></Select>
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="justify-end gap-2 border-t">
              <Button variant="outline">Annuler</Button>
              <Button onClick={save} disabled={saving}>{saving ? <><Spinner />Enregistrement…</> : "Enregistrer"}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifs" className="mt-4">
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-lg">Notifications</CardTitle><CardDescription>Choisissez ce qui vous est signalé.</CardDescription></CardHeader>
            <CardContent>
              <FieldGroup>
                {[
                  ["Demande urgente", "Réclamation ou client qui attend depuis plus de 2 h", true],
                  ["Devis prêt à valider", "Dès que l'assistant a préparé un devis", true],
                  ["Résumé quotidien", "Chaque matin à 8 h, par mail", false],
                ].map(([t, d, on], i) => (
                  <div key={t as string}>
                    {i > 0 && <FieldSeparator className="mb-4" />}
                    <Field orientation="horizontal">
                      <FieldContent><FieldTitle>{t as string}</FieldTitle><FieldDescription>{d as string}</FieldDescription></FieldContent>
                      <Switch defaultChecked={on as boolean} onCheckedChange={(v) => toast(v ? "Notification activée" : "Notification coupée", { description: t as string })} />
                    </Field>
                  </div>
                ))}
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipe" className="mt-4">
          <Card className="shadow-soft">
            <CardHeader><CardTitle className="text-lg">Équipe</CardTitle><CardDescription>Qui peut voir et valider les demandes.</CardDescription></CardHeader>
            <CardContent>
              <ItemGroup className="gap-2">
                {TEAM.map((m) => (
                  <Item key={m.e} variant="outline" size="sm">
                    <ItemMedia><Avatar className="size-8"><AvatarFallback className="bg-secondary text-xs">{m.n.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar></ItemMedia>
                    <ItemContent><ItemTitle>{m.n}</ItemTitle><ItemDescription>{m.e}</ItemDescription></ItemContent>
                    <ItemActions>
                      <Select defaultValue={m.r} onValueChange={(v) => toast.success("Rôle modifié", { description: `${m.n} : ${v}` })}>
                        <SelectTrigger size="sm" className="w-28"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="membre">Membre</SelectItem><SelectItem value="lecture">Lecture</SelectItem></SelectContent>
                      </Select>
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            </CardContent>
            <CardFooter className="border-t">
              <Button variant="outline" onClick={() => toast.success("Invitation envoyée", { description: "nouveau.collegue@lambert-emballages.be" })}><Icon icon={Add01Icon} />Inviter un collègue</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
