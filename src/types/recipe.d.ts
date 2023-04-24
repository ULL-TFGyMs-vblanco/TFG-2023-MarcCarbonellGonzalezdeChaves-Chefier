export interface Recipe {
  name: string;
  username: string;
  images: string[];
  description: string;
  date: Date;
  tags: string[];
  difficulty: string;
  cookTime: number;
  ingredients: { name: string; quantity: number; unit: string }[];
  instructions: string[];
  saves: string[];
  likes: string[];
  valoration: number | 'NR';
  valorations: {
    username: string;
    comment: string;
    rating: number;
    date: Date;
    comments: {
      username: string;
      comment: string;
      date: Date;
    }[];
  }[];
}
