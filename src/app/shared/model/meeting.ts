export interface Meeting {
    id?: number; // Utilisez '?' pour rendre la propriété id facultative
    titre: string;
    description: string;
    date: string;
    link: string;
    participants?: number[];
  }
  