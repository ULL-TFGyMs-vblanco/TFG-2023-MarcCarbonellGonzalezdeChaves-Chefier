import Image from 'next/image';
import { Card } from '../ui/Card';
import styles from 'src/styles/recipe/RecipeCard.module.css';
import { BsBookmarkFill, BsFillStarFill, BsHeartFill } from 'react-icons/bs';
import { Recipe, ValidUpdate } from 'recipe-types';
import utils from 'src/utils/RecipeUtils';
import { useSession } from 'next-auth/react';
import { useInteraction } from '../../hooks/useInteraction';
import { useLoggedUser } from '@/hooks/useLoggedUser';
import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface RecipeCardProps {
  recipe: Recipe;
  updateHandler: (recipeId: string, update: ValidUpdate) => Promise<void>;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  updateHandler,
}) => {
  const { data: session } = useSession();
  const { user, isLoading: loggedUserIsLoading } = useLoggedUser();
  const router = useRouter();
  const {
    checked: saved,
    check: save,
    uncheck: removeSave,
  } = useInteraction('saved', recipe, user, updateHandler);
  const {
    checked: liked,
    check: like,
    uncheck: removeLike,
  } = useInteraction('likes', recipe, user, updateHandler);

  const saveHandler = async () => {
    await save();
  };

  const removeSaveHandler = async () => {
    await removeSave();
  };

  const likeHandler = async () => {
    await like();
  };

  const removeLikeHandler = async () => {
    await removeLike();
  };

  const clickHandler = async () => {
    await router.push(`/recipe/${recipe._id}`);
  };

  return (
    <Card style={styles.recipe__container}>
      <div className={styles.recipe__buttons}>
        {session &&
          (loggedUserIsLoading ? (
            <Loading
              size='sm'
              css={{
                position: 'absolute',
                bottom: '7.5rem',
                right: '3.25rem',
                zIndex: '1',
              }}
            />
          ) : saved ? (
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
                bottom: '7.5rem',
                right: '1.25rem',
                zIndex: '1',
              }}
            />
          ) : liked ? (
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
      <div className={styles.recipe__data} onClick={clickHandler}>
        {!session && (
          <>
            <BsBookmarkFill className={styles.disabled__save__button} />
            <BsHeartFill className={styles.disabled__like__button} />
          </>
        )}
        <div className={styles.image__container}>
          <Image
            src={recipe.image.url}
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
              <p>{utils.getAverageRating(recipe.valorations)}</p>
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
