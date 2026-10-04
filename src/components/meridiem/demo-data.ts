/* Données d'exemple de la plateforme type (fictives). */
import type { Status } from "@/components/meridiem/brand"

export type Request = { id: string; title: string; client: string; contact: string; type: string; at: string; amount: string; status: Status; label: string; owner: string }

export const REQUESTS: Request[] = [
  { id: "D-2611", title: "Devis 12 000 bocaux 370 ml", client: "Brasserie de Waremme", contact: "Marc Lejeune", type: "Devis", at: "09:12", amount: "8 640,00 €", status: "wait", label: "À valider", owner: "JR" },
  { id: "D-2610", title: "Retard de livraison, commande 4512", client: "Cartonnages Dumont", contact: "Sophie Dumont", type: "Réclamation", at: "08:47", amount: "", status: "crit", label: "Urgent", owner: "TB" },
  { id: "D-2609", title: "Commande récurrente d'octobre", client: "Menuiserie Halleux", contact: "Luc Halleux", type: "Commande", at: "08:30", amount: "2 315,40 €", status: "ok", label: "Traitée", owner: "JR" },
  { id: "D-2608", title: "Nouvelle adresse de facturation", client: "Fromagerie du Condroz", contact: "Anne Collard", type: "Administratif", at: "08:02", amount: "", status: "ok", label: "Traitée", owner: "IA" },
  { id: "D-2607", title: "Échantillons couvercles 82 mm", client: "Transports Remy", contact: "Paul Remy", type: "Devis", at: "hier 17:40", amount: "", status: "info", label: "En cours", owner: "TB" },
  { id: "D-2606", title: "Devis 4 000 pots 212 ml", client: "Biscuiterie Destrée", contact: "Claire Destrée", type: "Devis", at: "hier 16:05", amount: "3 120,00 €", status: "wait", label: "À valider", owner: "JR" },
  { id: "D-2605", title: "Facture 2026-0912 contestée", client: "Confiturerie Gérard", contact: "Henri Gérard", type: "Réclamation", at: "hier 14:22", amount: "1 480,00 €", status: "warn", label: "Bloquée", owner: "TB" },
  { id: "D-2604", title: "2 palettes bouteilles 75 cl", client: "Domaine du Chenoy", contact: "Éric Lambotte", type: "Commande", at: "hier 11:10", amount: "5 960,00 €", status: "ok", label: "Traitée", owner: "IA" },
]

export type Client = { id: string; name: string; city: string; contact: string; sector: string; revenue: number; requests: number; status: "Actif" | "Prospect" | "En pause" }
export const CLIENTS: Client[] = [
  { id: "c1", name: "Brasserie de Waremme", city: "Waremme", contact: "Marc Lejeune", sector: "Boissons", revenue: 48200, requests: 31, status: "Actif" },
  { id: "c2", name: "Biscuiterie Destrée", city: "Gembloux", contact: "Claire Destrée", sector: "Alimentaire", revenue: 36950, requests: 22, status: "Actif" },
  { id: "c3", name: "Domaine du Chenoy", city: "Émines", contact: "Éric Lambotte", sector: "Vins", revenue: 29400, requests: 18, status: "Actif" },
  { id: "c4", name: "Confiturerie Gérard", city: "Huy", contact: "Henri Gérard", sector: "Alimentaire", revenue: 21780, requests: 15, status: "Actif" },
  { id: "c5", name: "Menuiserie Halleux", city: "Hannut", contact: "Luc Halleux", sector: "Bois", revenue: 18300, requests: 12, status: "Actif" },
  { id: "c6", name: "Fromagerie du Condroz", city: "Ciney", contact: "Anne Collard", sector: "Alimentaire", revenue: 15120, requests: 9, status: "En pause" },
  { id: "c7", name: "Cartonnages Dumont", city: "Liège", contact: "Sophie Dumont", sector: "Emballage", revenue: 12640, requests: 14, status: "Actif" },
  { id: "c8", name: "Transports Remy", city: "Namur", contact: "Paul Remy", sector: "Logistique", revenue: 6200, requests: 5, status: "Prospect" },
  { id: "c9", name: "Savonnerie de Hesbaye", city: "Waremme", contact: "Inès Moreau", sector: "Cosmétique", revenue: 4800, requests: 3, status: "Prospect" },
  { id: "c10", name: "Distillerie Mosane", city: "Andenne", contact: "Victor Pirard", sector: "Boissons", revenue: 0, requests: 1, status: "Prospect" },
]

export const NOTIFICATIONS = [
  { id: 1, title: "Devis D-2611 prêt à valider", text: "Brasserie de Waremme · 8 640,00 €", at: "il y a 5 min" },
  { id: 2, title: "Réclamation urgente", text: "Cartonnages Dumont, commande 4512", at: "il y a 32 min" },
  { id: 3, title: "14 mails rangés par l'assistant", text: "Boîte commerciale", at: "08:15" },
]

export const ACTIVITY = [
  { who: "Assistant", what: "a préparé le devis D-2611", at: "09:12" },
  { who: "Thomas Bastin", what: "a répondu à Cartonnages Dumont", at: "09:01" },
  { who: "Assistant", what: "a traité la commande D-2609", at: "08:31" },
  { who: "Julie Remacle", what: "a validé le devis D-2598", at: "08:20" },
  { who: "Assistant", what: "a rangé 14 mails entrants", at: "08:15" },
]
