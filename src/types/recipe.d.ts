declare module 'recipe-types' {
  interface Recipe {
    _id: string;
    name: string;
    user: {
      name: string;
      image: string;
    };
    image: { url: string; fileId: string };
    description: string;
    date: string;
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
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: Instruction[];
    saved: string[];
    likes: string[];
    valoration: number;
    valorations: Valoration[];
  }

  interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
  }

  interface Instruction {
    step: string;
  }

  interface Valoration {
    user: {
      name: string;
      image: string;
    };
    title: string;
    comment?: string;
    rating: number;
    date: string | Date;
  }

  interface ValidUpdate {
    likes?: string[];
    saved?: string[];
    valorations?: Valoration[];
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
}
