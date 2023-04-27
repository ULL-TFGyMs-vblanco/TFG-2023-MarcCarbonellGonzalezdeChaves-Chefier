import Image from 'next/image';
import { Card } from '../ui/Card';
import styles from 'src/styles/recipe/RecipeCard.module.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillStarFill } from 'react-icons/bs';
import { Recipe } from 'recipe-types';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card style={styles.recipe__container}>
      <div className={styles.favorite__container}>
        <button className={styles.favorite__button}>
          <AiOutlineHeart className={styles.heart} />
        </button>
        <span className={styles.favorite__count}>{recipe.likes.length}</span>
      </div>
      <div className={styles.image__container}>
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          sizes='(max-width: 768px) 100vw, 400px'
          className={styles.image}
        />
        <div className={styles.image__overlay} />
      </div>
      <p className={styles.name}>{recipe.name}</p>
      <div className={styles.info}>
        <div className={styles.stats}>
          <div className={styles.valoration}>
            <BsFillStarFill className={styles.star} />
            <p>{recipe.valoration}</p>
          </div>
          <hr className={styles.divider} />
          <p className={styles.time}>{recipe.cookTime}m</p>
          <hr className={styles.divider} />
          <p className={styles.difficulty}>{recipe.difficulty}</p>
        </div>
      </div>
    </Card>
  );
};
