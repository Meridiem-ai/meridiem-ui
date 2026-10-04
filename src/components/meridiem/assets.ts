/* Fichiers de marque. Par défaut : les versions publiques du dépôt (CORS ouvert, utilisables dans un canvas).
   Une app peut les remplacer par ses fichiers locaux au démarrage avec setMeridiemAssets(). */
const BASE = "https://raw.githubusercontent.com/Meridiem-ai/meridiem-ui/main/public/assets/"

export const assets = {
  logo: BASE + "meridiem-logo-noir.png",
  mark: BASE + "meridiem-icone.png",
  city: BASE + "ville-europe.jpg",
}

export function setMeridiemAssets(next: Partial<typeof assets>) {
  Object.assign(assets, next)
}
