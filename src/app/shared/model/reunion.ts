// Interface Reunion
export interface Reunion {
  id?: number; 
  titre: string; 
  description: string; 
  date: string; 
  participants?: number[];
  id_admin?: number; // Propriété optionnelle
  statut?:Boolean; // Propriété optionnelle
  created_at?: string; // Propriété optionnelle
  updated_at?: string; // Propriété optionnelle
}
