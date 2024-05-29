
// Interface Reunion
export interface Reunion {
  id?: number; // L'ID de la réunion peut être optionnel si elle n'est pas encore créée
  titre: string; // Titre de la réunion
  description: string; // Description de la réunion
  date: string; // Date et heure de début de la réunion au format ISO
  participants?: number[]; // IDs des participants
}