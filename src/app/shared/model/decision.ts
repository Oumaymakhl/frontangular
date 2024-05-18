export class Decision {
  id: number;
  title: string;
  description: string;
  likes_count: number; // Ajoutez cette propriété
  dislikes_count: number; // Ajoutez cette propriété
  alreadyLiked?: boolean; // Ajoutez cette propriété optionnelle si nécessaire
  alreadyDisliked?: boolean;
}