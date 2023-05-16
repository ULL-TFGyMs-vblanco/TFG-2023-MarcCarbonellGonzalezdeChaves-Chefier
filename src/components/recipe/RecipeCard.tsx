import Image from 'next/image';
import { Card } from '../ui/Card';
import styles from 'src/styles/recipe/RecipeCard.module.css';
import { BsBookmarkFill, BsFillStarFill, BsHeartFill } from 'react-icons/bs';
import { Recipe } from 'recipe-types';
import utils from 'src/utils/RecipeUtils';
import { useSession } from 'next-auth/react';
import { useSave } from '../../hooks/useSave';
import { useLike } from '../../hooks/useLike';
import { useLoggedUser } from '@/hooks/useLoggedUser';
import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';

// Interface for RecipeCard component
interface RecipeCardProps {
  // Recipe to be displayed
  recipe: Recipe;
  // Function to be called when the recipe is updated
  onChange: (
    updatedRecipe: Recipe,
    options?: {
      remove?: boolean;
    }
  ) => Promise<void>;
}

// RecipeCard component
export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onChange }) => {
  const { data: session } = useSession();
  const { user, isLoading: loggedUserIsLoading } = useLoggedUser();
  const { save, removeSave } = useSave(recipe, user);
  const { like, removeLike } = useLike(recipe, user);
  const router = useRouter();

  const saveHandler = async (e: any) => {
    e.stopPropagation();
    const updatedRecipe = {
      ...recipe,
      saved: [...recipe.saved, user._id],
    };
    await onChange(updatedRecipe);
    await save();
  };

  const likeHandler = async (e: any) => {
    e.stopPropagation();
    const updatedRecipe = {
      ...recipe,
      likes: [...recipe.likes, user._id],
    };
    await onChange(updatedRecipe);
    await like();
  };

  const removeSaveHandler = async (e: any) => {
    e.stopPropagation();
    const updatedRecipe = {
      ...recipe,
      saved: recipe.saved.filter((id) => id !== user._id),
    };
    if (router.query.tab === 'saved') {
      await onChange(updatedRecipe, { remove: true });
    } else {
      await onChange(updatedRecipe);
    }
    await removeSave();
  };

  const removeLikeHandler = async (e: any) => {
    e.stopPropagation();
    const updatedRecipe = {
      ...recipe,
      likes: recipe.likes.filter((id) => id !== user._id),
    };
    if (router.query.tab === 'likes') {
      await onChange(updatedRecipe, { remove: true });
    } else {
      await onChange(updatedRecipe);
    }
    await removeLike();
  };

  const clickHandler = async () => {
    await router.push(`/recipe/${recipe._id}`);
  };

  return (
    <Card className={styles.recipe__container}>
      <div className={styles.recipe__data} onClick={clickHandler}>
        <div className={styles.image__container}>
          <Image
            src={recipe.image.url}
            alt={recipe.name}
            fill
            sizes='(max-width: 768px) 100vw, 400px'
            className={styles.image}
          />
          <div className={styles.image__overlay} />
          <div className={styles.recipe__buttons}>
            {session &&
              (loggedUserIsLoading ? (
                <Loading
                  size='sm'
                  css={{
                    position: 'absolute',
                    bottom: '0.35rem',
                    right: '3.25rem',
                    zIndex: '1',
                  }}
                />
              ) : recipe.saved.includes(user._id) ? (
                <BsBookmarkFill
                  className={styles.checked__save__button}
                  onClick={removeSaveHandler}
                />
              ) : (
                <BsBookmarkFill
                  className={styles.unchecked__save__button}
                  onClick={saveHandler}
                />
              ))}
            <p className={styles.saved__count}>
              {utils.countInteractions(recipe.saved)}
            </p>
            {session &&
              (loggedUserIsLoading ? (
                <Loading
                  size='sm'
                  css={{
                    position: 'absolute',
                    bottom: '0.35rem',
                    right: '1.25rem',
                    zIndex: '1',
                  }}
                />
              ) : recipe.likes.includes(user._id) ? (
                <BsHeartFill
                  className={styles.checked__like__button}
                  onClick={removeLikeHandler}
                />
              ) : (
                <BsHeartFill
                  className={styles.unchecked__like__button}
                  onClick={likeHandler}
                />
              ))}
            <p className={styles.likes__count}>
              {utils.countInteractions(recipe.likes)}
            </p>
          </div>
          {!session && (
            <>
              <BsBookmarkFill className={styles.disabled__save__button} />
              <BsHeartFill className={styles.disabled__like__button} />
            </>
          )}
        </div>
        <p className={styles.name}>{recipe.name}</p>
        <div className={styles.info}>
          <div className={styles.stats}>
            <div className={styles.valoration}>
              <BsFillStarFill className={styles.star} />
              <p>{recipe.averageRating}</p>
            </div>
            <hr className={styles.divider} />
            <p className={styles.time}>{recipe.cookTime}m</p>
            <hr className={styles.divider} />
            <p className={styles.difficulty}>{recipe.difficulty}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
