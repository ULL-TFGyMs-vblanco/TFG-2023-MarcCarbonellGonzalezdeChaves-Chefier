import styles from 'src/styles/recipe/Recipe.module.css';
import Image from 'next/image';
import { Title } from '../../components/ui/Title';
import { Avatar } from '../../components/ui/Avatar';
import { BiTimeFive, BiEditAlt } from 'react-icons/bi';
import { Valoration } from '../../components/recipe/Valoration';
import TimeAgo from 'javascript-time-ago';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';
import { useShow } from '../../hooks/useShow';
import ReactStars from 'react-stars';
import { GrStar } from 'react-icons/gr';
import { BsBookmarkFill, BsFillPersonFill, BsHeartFill } from 'react-icons/bs';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Loading } from '@nextui-org/react';
import {
  Ingredient,
  Instruction,
  ValidUpdate,
  Valoration as ValorationType,
  Recipe as RecipeType,
} from 'recipe-types';
import { useLoggedUser } from '../../hooks/useLoggedUser';
import { useSession } from 'next-auth/react';
import utils from '../../utils/RecipeUtils';
import { CustomModal } from '../ui/CustomModal';
import { useStat } from '../../hooks/useStat';
import { useValoration } from '../../hooks/useValoration';

const timeAgo = new TimeAgo('es-ES');

interface RecipeProps {
  recipe: RecipeType;
  updateHandler: (update: ValidUpdate) => Promise<void>;
  deleteHandler: () => Promise<void>;
}

export const Recipe: React.FC<RecipeProps> = ({
  recipe,
  updateHandler,
  deleteHandler,
}) => {
  const { show, toggleShow } = useShow();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState<string>();
  const [reviewTitle, setReviewTitle] = useState<string>();
  const [recipeModalVisible, setRecipeModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, isLoading: loggedUserIsLoading } = useLoggedUser();
  const {
    checked: saved,
    check: save,
    uncheck: removeSave,
  } = useStat('saved', recipe, user._id, updateHandler);
  const {
    checked: liked,
    check: like,
    uncheck: removeLike,
  } = useStat('likes', recipe, user, updateHandler);
  const { data: session } = useSession();
  const {
    isLoading: isPostingValoration,
    valorate,
    removeValoration,
  } = useValoration(recipe, user, updateHandler);

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

  const valorationHandler = async () => {
    await valorate(reviewTitle as string, rating, comment);
    toggleShow();
  };

  const removeValorationHandler = async () => {
    await removeValoration();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setRecipeModalVisible(false);
    await deleteHandler();
    setIsDeleting(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top__section}>
          <div className={styles.left__subsection}>
            <Title style={styles.title}>{recipe.name}</Title>
            <div className={styles.field} data-testid='form-field'>
              <div className={styles.user__info}>
                <Avatar
                  source={recipe.user.image}
                  username={recipe.user.name}
                  link={`/${recipe.user.name}`}
                  size={30}
                  style={styles.avatar}
                />
                <Link
                  href={`/${recipe.user.name}`}
                  className={styles.user__name}
                >
                  <p>@{recipe.user.name}</p>
                </Link>
                <p>
                  &middot;&nbsp;&nbsp;
                  {timeAgo.format(Date.parse(recipe.date))}
                </p>
              </div>
            </div>
            <div className={styles.field} data-testid='form-field'>
              <p>{recipe.description}</p>
            </div>
            <div className={styles.field} data-testid='form-field'>
              <div className={styles.tags__container}>
                {recipe.tags.breakfast && (
                  <Link href={'/?tag=breakfast'}>
                    <label className={styles.tag}>Desayuno</label>
                  </Link>
                )}
                {recipe.tags.lunch && (
                  <Link href={'/?tag=lunch'}>
                    <label className={styles.tag}>Almuerzo</label>
                  </Link>
                )}
                {recipe.tags.dinner && (
                  <Link href={'/?tag=dinner'}>
                    <label className={styles.tag}>Cena</label>
                  </Link>
                )}
                {recipe.tags.dessert && (
                  <Link href={'/?tag=dessert'}>
                    <label className={styles.tag}>Postre</label>
                  </Link>
                )}
                {recipe.tags.snack && (
                  <Link href={'/?tag=snack'}>
                    <label className={styles.tag}>Picoteo</label>
                  </Link>
                )}
                {recipe.tags.drink && (
                  <Link href={'/?tag=drink'}>
                    <label className={styles.tag}>Bebida</label>
                  </Link>
                )}
              </div>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat} data-testid='form-field'>
                <p className={styles.field__title}>Valoración</p>
                <div className={styles.stat__data}>
                  <GrStar className={styles.star__icon} size={20} />
                  <p className={styles.stat__number}>
                    {utils.getAverageRating(recipe.valorations)}
                  </p>
                </div>
              </div>
              <hr className={styles.stats__divider} />
              <div className={styles.stat} data-testid='form-field'>
                <p className={styles.field__title}>Tiempo</p>
                <div className={styles.stat__data}>
                  <BiTimeFive className={styles.clock__icon} />
                  <p className={styles.stat__number}>{recipe.cookTime}min</p>
                </div>
              </div>
              <hr className={styles.stats__divider} />
              <div className={styles.stat} data-testid='form-field'>
                <p className={styles.field__title}>Dificultad</p>
                <p>{recipe.difficulty}</p>
              </div>
            </div>
          </div>
          <div className={styles.right__subsection}>
            <div className={styles.field} data-testid='form-field'>
              <div className={styles.image__container}>
                <Image
                  src={recipe.image.url}
                  alt='Imagen de la receta'
                  style={{ objectFit: 'cover' }}
                  fill
                  priority
                />
                {session ? (
                  loggedUserIsLoading ? (
                    <Loading />
                  ) : saved ? (
                    <BsBookmarkFill
                      className={styles.marked__save__button}
                      onClick={removeSaveHandler}
                    />
                  ) : (
                    <BsBookmarkFill
                      className={styles.unmarked__save__button}
                      onClick={saveHandler}
                    />
                  )
                ) : (
                  <BsBookmarkFill className={styles.disabled__save__button} />
                )}
                <p className={styles.saved__count}>
                  {utils.countRecipeStat(recipe.saved)}
                </p>
                {session ? (
                  loggedUserIsLoading ? (
                    <Loading />
                  ) : liked ? (
                    <BsHeartFill
                      className={styles.marked__like__button}
                      onClick={removeLikeHandler}
                    />
                  ) : (
                    <BsHeartFill
                      className={styles.unmarked__like__button}
                      onClick={likeHandler}
                    />
                  )
                ) : (
                  <BsHeartFill className={styles.disabled__like__button} />
                )}
                <p className={styles.likes__count}>
                  {utils.countRecipeStat(recipe.likes)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle__section}>
          <div className={styles.left__subsection}>
            <div className={styles.field} data-testid='form-field'>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <p className={styles.field__title}>Ingredientes</p>
                <p style={{ fontWeight: 'bold' }}>
                  <BsFillPersonFill className={styles.rations__icon} />
                  {recipe.rations}
                </p>
              </div>
              <div>
                {recipe.ingredients.map(
                  (ingredient: Ingredient, index: number) => (
                    <div key={index}>
                      <div className={styles.ingredient}>
                        <p>
                          {ingredient.quantity} {ingredient.unit} de{' '}
                          {ingredient.name}
                        </p>
                      </div>
                      {index < recipe.ingredients.length - 1 && <hr />}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className={styles.right__subsection}>
            <div className={styles.field} data-testid='form-field'>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <p className={styles.field__title}>Pasos</p>
              </div>
              <div>
                {recipe.instructions.map(
                  (instruction: Instruction, index: number) => (
                    <div key={index}>
                      <div className={styles.instruction}>
                        <div className={styles.instruction__number}>
                          {index + 1}
                        </div>
                        <p className={styles.step}>{instruction.step}</p>
                      </div>
                      {index < recipe.instructions.length - 1 && <hr />}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom__section}>
          <div className={styles.field} data-testid='form-field'>
            <div className={styles.valorations__header}>
              <p className={styles.field__title}>
                Valoraciones y reseñas&nbsp;&nbsp;&middot;&nbsp;&nbsp;
                {recipe.valorations.length} valoraciones
              </p>
              {session &&
                user &&
                !show &&
                !utils.isAlreadyValorated(recipe.valorations, user) && (
                  <Button style={styles.add__button} onClick={toggleShow}>
                    <BiEditAlt />
                    Escribir&nbsp;reseña
                  </Button>
                )}
            </div>
            <div className={styles.valoration__mean}>
              <p className={styles.mean}>
                {utils.getAverageRating(recipe.valorations)}
              </p>
              <ReactStars
                count={5}
                size={30}
                color2='#F5A524'
                value={utils.getAverageRating(recipe.valorations)}
                edit={false}
              />
            </div>
            {show && (
              <div className={styles.review__container}>
                <div className={styles.header}>
                  <div className={styles.rating}>
                    <p className={styles.rating__msg}>
                      Toca una estrella para valorar:
                    </p>
                    <ReactStars
                      className={styles.rating__input}
                      count={5}
                      size={24}
                      color2='#F5A524'
                      value={rating}
                      onChange={(value) => setRating(value)}
                    />
                  </div>
                  <div className={styles.review__buttons}>
                    <Button
                      style={styles.send__button}
                      onClick={valorationHandler}
                      disabled={reviewTitle ? false : true}
                    >
                      {isPostingValoration ? <Loading /> : 'Enviar'}
                    </Button>
                  </div>
                </div>
                <button className={styles.close__button} onClick={toggleShow}>
                  <IoClose size={20} />
                </button>
                <input
                  className={styles.comment__input}
                  type='text'
                  placeholder='Título'
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
                <textarea
                  className={styles.comment__input}
                  placeholder='Reseña (opcional)'
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                  style={{ resize: 'none', height: 'auto' }}
                />
              </div>
            )}
            <div>
              {recipe.valorations
                .slice(0)
                .reverse()
                .map((valoration: ValorationType, index: number) => (
                  <div key={index}>
                    <Valoration
                      valoration={valoration}
                      deleteHandler={removeValorationHandler}
                    />
                    {index < recipe.valorations.length - 1 && <hr />}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {session && user && user._id === recipe.user.id && (
          <Button
            style={styles.delete__button}
            onClick={() => setRecipeModalVisible(true)}
          >
            {isDeleting ? <Loading /> : 'Eliminar receta'}
          </Button>
        )}
      </div>
      <CustomModal
        title='¿Estás seguro de que quieres eliminar esta receta?'
        type='warning'
        visible={recipeModalVisible}
        handler={setRecipeModalVisible}
        onClose={handleDelete}
      >
        Esta acción no se puede deshacer.
      </CustomModal>
    </>
  );
};
