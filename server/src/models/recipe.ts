import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface RecipeDocumentInterface extends Document {
  name: string;
  username: string;
  description: string;
  date: Date;
  tags: [string];
  difficulty: string;
  cookTime: number;
  ingredients: [{ name: string; quantity: number; unit: string }];
  instructions: [string];
  valorations: [
    {
      username: string;
      comment: string;
      rating: number;
      date: Date;
      comments: [
        {
          username: string;
          comment: string;
          date: Date;
        }
      ];
    }
  ];
}

export const RecipeSchema = new Schema<RecipeDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isAlphanumeric(value)) {
        throw new Error('Name must be alphanumeric');
      }
      if (!validator.isLength(value, { max: 20 })) {
        throw new Error('Name must have a maximum of 20 characters');
      }
    },
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isLength(value, { max: 100 })) {
        throw new Error('Description have a maximum of 100 characters');
      }
    },
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: [String],
    trim: true,
    validate: (value: [string]) => {
      value.forEach((tag) => {
        if (!RegExp('^#').test(tag)) {
          throw new Error('Tags must begin with #');
        }
      });
    },
    default: [],
  },
  difficulty: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isIn(value, ['Easy', 'Medium', 'Hard'])) {
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
  ingredients: {
    type: [{ name: String, quantity: Number, unit: String }],
    required: true,
    validate: (value: [{ name: string; quantity: number; unit: string }]) => {
      value.forEach((ingredient) => {
        if (!validator.isAlphanumeric(ingredient.name)) {
          throw new Error('Name must be alphanumeric');
        }
        if (ingredient.quantity < 0) {
          throw new Error('Ingredient quantity must be positive');
        }
      });
    },
  },
  instructions: {
    type: [String],
    required: true,
    validate: (value: [string]) => {
      value.forEach((instruction) => {
        if (!validator.isLength(instruction, { max: 100 })) {
          throw new Error('Instruction have a maximum of 100 characters');
        }
      });
    },
  },
  valorations: {
    type: [
      {
        username: String,
        comment: String,
        valoration: Number,
        date: Date,
        comments: [{ username: String, comment: String, date: Date }],
      },
    ],
    validate: (
      value: [
        {
          username: string;
          comment: string;
          rating: number;
          date: Date;
          comments: [{ username: string; comment: string; date: Date }];
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
        valoration.comments.forEach((comment) => {
          if (!validator.isLength(comment.comment, { max: 100 })) {
            throw new Error('Comment have a maximum of 100 characters');
          }
        });
      });
    },
    default: [],
  },
});

export const Recipe = model<RecipeDocumentInterface>('Recipe', RecipeSchema);
