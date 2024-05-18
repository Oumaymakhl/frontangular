export interface Reunion {
  id?: number; // L'ID de la réunion peut être optionnel si elle n'est pas encore créée
  titre: string; // Titre de la réunion
  description: string; // Description de la réunion
  date: Date; // Date et heure de début de la réunion
  end?: Date; // Date et heure de fin de la réunion (optionnel)
}
