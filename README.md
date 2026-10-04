# meridiem-ui · design system Olympe

Le design system de [Meridiem](https://www.meridiem.be) : un socle commun pour les plateformes, les sites et les outils que nous construisons, pour que tout soit cohérent, propre et rapide à produire. Les agents IA qui développent pour Meridiem partent d'ici au lieu de recoder les mêmes blocs.

**Olympe** : ivoire et encre, titres en EB Garamond, interface en Geist, icônes Hugeicons, terracotta réservé à l'action principale. Composants shadcn/ui (Radix) habillés par le thème, graphiques Recharts, tables TanStack, animations Motion.

## Ce qu'il contient
| Dossier | Contenu | Pour |
|---|---|---|
| `registry.json`, `public/r/` | registre shadcn : thème, styles, briques de marque, carte animée, graphiques, table, plateforme type, landing | projets React (Vite, Next) |
| `vanilla/` | `olympe.css` (classes `.m-*`), `meridiem.js` (les blocs : cartes animées, graphiques, bandeau ville, points animés, menu, pastille, toasts, états vides), `icons.js` (116 icônes), `art.js` (moteur de visuels), `demo.html` | pages sans framework |
| `tokens/` | jetons au format DTCG | tout outil (Figma, Style Dictionary, documents) |
| `src/` | la démo : plateforme interactive, landing, kit de référence | consulter, copier |
| `DESIGN.md` | les règles, à lire avant toute interface | humains et agents |

## Installer dans un projet React (shadcn/ui)
Le projet doit déjà utiliser shadcn/ui (Tailwind 4, alias `@/`). Avec `iconLibrary: "hugeicons"` dans `components.json`, les composants shadcn utilisent les mêmes icônes.

```bash
R=https://raw.githubusercontent.com/Meridiem-ai/meridiem-ui/main/public/r
npx shadcn@latest add $R/olympe-theme.json $R/olympe-styles.json
npx shadcn@latest add $R/kpi-card.json $R/charts.json      # au besoin
npx shadcn@latest add $R/platform.json                      # gabarit de plateforme complet
```
Puis importer les styles dans le CSS principal : `@import "./styles/olympe.css";`.

| Élément | Ce que c'est |
|---|---|
| `olympe-theme` | les variables de couleur, polices, rayons, ombres, couleurs de statut |
| `olympe-styles` | polices locales et utilitaires : `.eyebrow`, `.hairline-grid`, `.stagger`, `.num` |
| `brand` | `Icon`, `CityDots` (ville en points), `DotField`, `DotChart`, `IsoArt` (9 animations), `StatusBadge` |
| `kpi-card` | carte indicateur avec illustration animée au survol |
| `charts` | aire à deux séries, colonnes tramées, barres empilées, courbe, jauge radiale |
| `clients-table` | table de données : recherche, tri, sélection, actions, pagination |
| `platform` | sidebar, menu du compte, ⌘K, notifications, tableau de bord, demandes, clients, réglages |
| `landing` | héros sur la ville en points, grille de filets, bloc final, prise de rendez-vous |

## Utiliser sans framework
```html
<link rel="stylesheet" href="vanilla/olympe.css">
<body class="m-body">
  <button class="m-btn m-btn-primary"><i data-icon="Add01"></i>Nouvelle demande</button>
  <span class="m-badge is-wait">À valider</span>
  <script src="vanilla/icons.js"></script>
  <script>MeridiemIcons.hydrate()</script>
</body>
```
Les blocs du design system existent aussi sans framework (`vanilla/meridiem.js`, objet `MUI`) :

| Bloc | Appel |
|---|---|
| Carte indicateur animée | `MUI.kpi({ label, value, note, kind: "bars" })` puis `MUI.bind(racine)` |
| Rangée de cartes rafraîchie en place (page qui se met à jour seule) | `MUI.kpis(el, [{ label, value, note, kind }])` |
| Graphiques | `MUI.area(el, …)`, `MUI.columns(el, …)`, `MUI.donut(el, …)`, `MUI.radial(el, …)` |
| Bandeau ville en points, bloc à points animés | `MUI.banner({ … })`, `MUI.ctaBand({ … })` |
| Menu du compte, pastille de navigation | `MUI.menu(bouton, panneau, { side: "top" })`, `MUI.navPill(nav)` |
| Palette de commandes ⌘K | `MUI.palette({ items: [{ group, label, icon, hint, run }], hotkey: true })` |
| Toasts, état vide, badge | `MUI.toast(titre, { description })`, `MUI.empty({ … })`, `MUI.badge(statut, texte)` |

Exemple complet : `vanilla/demo.html` (à servir en http, pas en file://).

## Lancer la démo
```bash
npm install
npm run dev        # #platform, #landing, #kit
npm run build:all  # démo (page unique dist/index.html), registre, version sans framework
```

## Règles en bref
- Un seul bouton terracotta par zone ; secondaire en contour, discret en fantôme.
- Un statut porte toujours un mot en plus de sa couleur.
- Chaque action a un effet visible : toast, fenêtre, panneau, chargement.
- Les états vides disent quoi faire et proposent l'action.
- Pas d'image tierce : les visuels sont générés (`art.js`) ou viennent de Meridiem.

Détail : [DESIGN.md](DESIGN.md).

## Licence
Code sous licence MIT. Le logo et les images Meridiem ne sont pas couverts : voir [NOTICE.md](NOTICE.md).
