import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface RecipeDocumentInterface extends Document {
  name: string;
  user: {
    name: string;
    image: string;
  };
  image: {
    url: string;
    fileId: string;
  };
  description: string;
  date: Date;
  tags: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    dessert: boolean;
    snack: boolean;
    drink: boolean;
  };
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  cookTime: number;
  rations: number;
  ingredients: [{ name: string; quantity: number; unit: string }];
  instructions: [{ step: string }];
  valorations: [
    {
      user: {
        name: string;
        image: string;
      };
      title: string;
      comment?: string;
      rating: number;
      date: Date;
    }
  ];
  likes: [string];
  saved: [string];
}

export const RecipeSchema = new Schema<RecipeDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isLength(value, { max: 50 })) {
        throw new Error('Name must have a maximum of 50 characters');
      }
    },
  },
  user: {
    type: { name: String, image: String },
    required: true,
  },
  image: {
    type: {
      url: String,
      fileId: String,
    },
    required: true,
    trim: true,
    validate: (value: { url: string; fileId: string }) => {
      if (!validator.isURL(value.url)) {
        throw new Error('Image must be a valid URL');
      }
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isLength(value, { max: 200 })) {
        throw new Error('Description have a maximum of 200 characters');
      }
    },
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: {
      breakfast: Boolean,
      lunch: Boolean,
      dinner: Boolean,
      dessert: Boolean,
      snack: Boolean,
    },
    default: {
      breakfast: false,
      lunch: false,
      dinner: false,
      dessert: false,
      snack: false,
    },
  },
  difficulty: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isIn(value, ['Fácil', 'Media', 'Difícil'])) {
        throw new Error('Difficulty must be Easy, Medium or Hard');
      }
    },
  },
  cookTime: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('Cook time must be positive');
      }
    },
  },
  rations: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value <= 0) {
        throw new Error('Rations must be positive');
      }
    },
  },
  ingredients: {
    type: [{ name: String, quantity: Number, unit: String }],
    required: true,
    validate: (value: [{ name: string; quantity: number; unit: string }]) => {
      value.forEach((ingredient) => {
        if (!validator.isLength(ingredient.name, { max: 50 })) {
          throw new Error(
            'Ingredient name must have a maximum of 50 characters'
          );
        }
        if (ingredient.quantity <= 0) {
          throw new Error('Ingredient quantity must be positive');
        }
        if (!validator.isLength(ingredient.unit, { max: 20 })) {
          throw new Error(
            'Ingredient unit must have a maximum of 20 characters'
          );
        }
      });
    },
  },
  instructions: {
    type: [{ step: String }],
    required: true,
    validate: (value: [{ step: string }]) => {
      value.forEach((instruction) => {
        if (!validator.isLength(instruction.step, { max: 200 })) {
          throw new Error('Instruction have a maximum of 200 characters');
        }
      });
    },
  },
  valorations: {
    type: [
      {
        user: {
          name: String,
          image: String,
        },
        comment: String,
        valoration: Number,
        date: Date,
      },
    ],
    validate: (
      value: [
        {
          user: {
            name: string;
            image: string;
          };
          comment: string;
          rating: number;
          date: Date;
        }
      ]
    ) => {
      value.forEach((valoration) => {
        if (!validator.isLength(valoration.comment, { max: 100 })) {
          throw new Error(
            'Valoration comment have a maximum of 100 characters'
          );
        }
        if (
          !validator.isIn(valoration.rating.toString(), [
            '1',
            '2',
            '3',
            '4',
            '5',
          ])
        ) {
          throw new Error('Valoration must be between 1 and 5');
        }
      });
    },
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  saved: {
    type: [String],
    default: [],
  },
});

export const Recipe = model<RecipeDocumentInterface>('Recipe', RecipeSchema);
