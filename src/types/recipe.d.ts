declare module 'recipe-types' {
  export interface Recipe {
    name: string;
    username: string;
    image: string;
    description: string;
    date: Date;
    tags: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      dessert: boolean;
      snack: boolean;
    };
    cookTime: number;
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    rations: number;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: string[];
    saves: string[];
    likes: string[];
    valoration: number;
    valorations: {
      username: string;
      comment: string;
      rating: number;
      date: Date;
    }[];
  }

  interface NewRecipeFormInputs {
    name: string;
    description: string;
    tags: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      dessert: boolean;
      snack: boolean;
    };
    cookTime: number;
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    rations: number;
    image: File;
    ingredients: {
      name: string;
      quantity: number | undefined;
      unit: string;
    }[];
    instructions: {
      step: string;
    }[];
  }

  interface NewRecipeData {
    name: string;
    username: string;
    description: string;
    tags: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      dessert: boolean;
      snack: boolean;
    };
    cookTime: number;
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    rations: number;
    image: File;
    ingredients: {
      name: string;
      quantity: number | undefined;
      unit: string;
    }[];
    instructions: {
      step: string;
    }[];
  }
}
