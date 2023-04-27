import { Recipe } from 'recipe-types';
import { RecipeCard } from './RecipeCard';
import styles from '../../styles/recipe/RecipeList.module.css';

interface RecipeListProps {
  recipes: Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className={styles.list__container}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.name} recipe={recipe} />
      ))}
    </div>
  );
};
