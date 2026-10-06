# Changelog

## Non publié · 2026-10-06
Retours de la première intégration dans une app Next.js 16 (espace clients `meridiem-portail`, branche `design-olympe`).
- **`data-table`** (nouvel élément du registre) : table de données générique (TanStack + shadcn) ; colonnes, données et libellés fournis par l'app ; recherche (sur un texte choisi par ligne), tri avec flèche de sens, pagination, ligne cliquable, état vide avec « Effacer la recherche », colonnes masquables sur téléphone (`meta.className`). `ClientsTable` reste la démonstration figée ; démonstration générique ajoutée au kit (Tables).
- **`StatusBadge`** : statut `neutral` (clos, refusé, annulé, terminé), démontré dans le kit.
- **Next.js / RSC** : `"use client"` en tête des composants à hooks (`brand`, `kpi-card`, `charts`, `clients-table`, `landing`, gabarit `platform`). La CLI shadcn le retire pour un projet `rsc: false` (Vite), le garde pour Next.
- **Correctif SSR** : `art.js` lisait `window` au chargement du module ; dans Next, tout écran qui importait une brique de marque répondait 500 (`window is not defined`), build pourtant vert. Garde `typeof window`.
- **Correctif palette ⌘K du gabarit `platform`** : le contenu de `CommandDialog` n'était pas enveloppé dans `<Command>` ; cmdk plante à l'ouverture (`Cannot read properties of undefined (reading 'subscribe')`). Enveloppé.

## Non publié · 2026-10-04
- Sans framework : `MUI.actionBar` (barre d'actions unique : décision à gauche avec une phrase et un seul bouton terracotta, suivi à droite, « ⋯ » en `MUI.menu`, état fait, zone de saisie, deux lignes sous 520 px) et `MUI.busy` (bouton occupé).
- Icônes : `Agreement02` (poignée de main lisible à 16 px, retenue pour le CRM du Command Center ; `Agreement01` y devenait un gribouillis), 117 icônes.
- Sans framework : `MUI.palette` générique (sources de contenu asynchrones avec chargement et cache, groupes, classement, surbrillance des termes, état vide avec suggestion) ; `MUI.dialog` (fenêtre centrée façon shadcn Dialog) ; interrupteur `.m-switch`, lignes de réglage `.m-section` / `.m-setting`, indicateur `.m-spin`.
- Sans framework : `MUI.palette` (palette de commandes ⌘K : filtre sans accents, flèches, Entrée, Échap) et `MUI.kpis` (rangée de cartes indicateur mise à jour en place, sans rejouer les animations, pour les pages qui se rafraîchissent seules). Classes `.m-pal-*`. Démo : la recherche de `vanilla/demo.html` ouvre la palette.

## 0.1.0 · 2026-10-04
- Première version publique du design system Olympe : thème shadcn/ui, briques de marque (ville en points, champ de points, graphique en points, 9 cartes animées, badge de statut, icônes Hugeicons), graphiques, table de données, gabarits de plateforme et de landing, kit de référence.
- Registre shadcn (`public/r/`), version sans framework (`vanilla/`), jetons DTCG (`tokens/`).
