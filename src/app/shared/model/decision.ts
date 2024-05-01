export interface Decision {
    id?: number; // Le '?' rend la propriété 'id' optionnelle
    title: string;
    description: string;
    likes?: number; // Déclarer likes comme un nombre
    dislikes?: number; // Déclarer dislikes comme un nombre
  }
  