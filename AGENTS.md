# meridiem-ui

Design system Meridiem (Olympe). Lire `DESIGN.md` avant toute interface.

- Source du thème : `src/index.css` (variables shadcn) ; briques : `src/components/meridiem/` ; moteur de visuels : `src/lib/meridiem/art.js`.
- Après une modification : `npm run build:all` (démo, registre `public/r/`, `vanilla/`), puis contrôle visuel des écrans `#platform`, `#landing`, `#kit` à 1440 et 390 px.
- Un composant shadcn manquant : `npx shadcn@latest add <nom>` (icônes Hugeicons via `components.json`).
- Ne jamais remplacer le logo ni l'image de ville par des fichiers tiers.
