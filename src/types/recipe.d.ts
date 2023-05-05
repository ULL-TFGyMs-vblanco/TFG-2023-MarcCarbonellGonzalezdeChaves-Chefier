declare module 'recipe-types' {
  interface Recipe {
    name: string;
    username: string;
    image: { url: string; fileId: string };
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
    valorations: Valoration[];
  }

  interface Valoration {
    username: string;
    title: string;
    comment?: string;
    rating: number;
    date: Date;
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
    image: any;
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
