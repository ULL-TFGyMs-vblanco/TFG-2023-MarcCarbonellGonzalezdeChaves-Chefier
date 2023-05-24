// Recipe types
declare module 'recipe-types' {
  // Recipe object returned by the API
  interface Recipe {
    _id: string;
    name: string;
    user: {
      id: any;
      name: string;
      image: string;
    };
    image: { url: string; fileId: string };
    description: string;
    date: string;
    tags: {
      breakfast: boolean | 'Desayuno';
      lunch: boolean | 'Almuerzo';
      dinner: boolean | 'Cena';
      dessert: boolean | 'Postre';
      snack: boolean | 'Picoteo';
      drink: boolean | 'Bebida';
    };
    cookTime: number;
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    rations: number;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: Instruction[];
    saved: string[];
    likes: string[];
    averageRating: number;
    valorations: Valoration[];
  }

  // Recipe ingredient
  interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
  }

  // Recipe instruction
  interface Instruction {
    step: string;
  }

  // Recipe valoration
  interface Valoration {
    user: {
      id: string;
      name: string;
      image: string;
    };
    title: string;
    comment?: string;
    rating: number;
    date: string;
  }

  // Valid recipe fields to updated
  interface ValidUpdate {
    likes?: string[];
    saved?: string[];
    valorations?: Valoration[];
    averageRating?: number;
  }

  // New recipe form inputs
  interface NewRecipeFormInputs {
    name: string;
    description: string;
    tags: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      dessert: boolean;
      snack: boolean;
      drink: boolean;
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

  // New recipe data to send to the API
  interface NewRecipeData {
    name: string;
    user: {
      name: string;
      image: string;
    };
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

  // Filter box form inputs
  interface FilterBoxFormInputs {
    tags: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      dessert: boolean;
      snack: boolean;
      drink: boolean;
    };
    difficulty: {
      easy: boolean;
      medium: boolean;
      hard: boolean;
    };
  }
}
