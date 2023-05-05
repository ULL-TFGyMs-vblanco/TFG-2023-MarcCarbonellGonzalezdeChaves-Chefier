import { Card } from '../../components/ui/Card';
import styles from 'src/styles/recipe/RecipePage.module.css';
import Image from 'next/image';
import { Title } from '../../components/ui/Title';
import { Avatar } from '../../components/ui/Avatar';
import { BiTimeFive, BiEditAlt } from 'react-icons/bi';
import { Review } from '../../components/recipe/Review';
import TimeAgo from 'javascript-time-ago';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';
import { useShow } from '../../hooks/useShow';
import ReactStars from 'react-stars';
import { GrStar } from 'react-icons/gr';
import { BsBookmarkFill, BsFillPersonFill, BsHeartFill } from 'react-icons/bs';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const timeAgo = new TimeAgo('es-ES');

const RecipePage: React.FC = () => {
  const { show, toggleShow } = useShow();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState();
  const [reviewTitle, setReviewTitle] = useState();
  // const { user } = useLoggedUser();
  const recipe = {
    name: 'Ensalada de quinoa y aguacate',
    username: 'chefjulia',
    image: {
      url: 'https://ik.imagekit.io/czvxqgafa/images/posts/demo/ensalada_quinoa_aguacate.jpg',
      fileId: '1234',
    },
    description:
      'Una receta saludable y fácil de preparar para una cena ligera.',
    date: new Date('2023-04-23T19:00:00.000Z'),
    tags: {
      breakfast: false,
      lunch: true,
      dinner: true,
      dessert: false,
      snack: false,
    },
    difficulty: 'Fácil',
    cookTime: 30,
    rations: 2,
    ingredients: [
      { name: 'quinoa', quantity: 1, unit: 'taza' },
      { name: 'aguacate', quantity: 2, unit: 'unidades' },
      { name: 'tomate cherry', quantity: 1, unit: 'taza' },
      { name: 'cebolla morada', quantity: 1, unit: 'unidad' },
      { name: 'pimiento rojo', quantity: 1, unit: 'unidad' },
      { name: 'limón', quantity: 1, unit: 'unidad' },
      { name: 'aceite de oliva', quantity: 2, unit: 'cucharadas' },
      { name: 'sal', quantity: 1, unit: 'pizca' },
      { name: 'pimienta negra', quantity: 1, unit: 'pizca' },
    ],
    instructions: [
      { step: 'Enjuagar la quinoa bajo agua fría y escurrir.' },
      {
        step: 'Colocar la quinoa en una olla con dos tazas de agua y sal al gusto. Cocinar a fuego medio hasta que la quinoa esté cocida, aproximadamente 15 minutos.',
      },
      {
        step: 'Mientras tanto, picar la cebolla, el pimiento y el tomate cherry. Cortar los aguacates en cubos y rociar con limón para evitar que se oxiden.',
      },
      { step: 'Una vez cocida la quinoa, dejar enfriar.' },
      {
        step: 'Mezclar la quinoa con los vegetales picados y el aceite de oliva.',
      },
      { step: 'Agregar sal y pimienta al gusto.' },
      { step: 'Servir frío y disfrutar!' },
    ],
    saves: ['saludablexsiempre', 'comidafit', 'cocineroencasa'],
    likes: ['chefpepe', 'saludablexsiempre', 'comidafit', 'cocineroencasa'],
    valorations: [
      {
        username: 'saludablexsiempre',
        title: 'Me encantó!',
        comment: 'Muy rica y fácil de preparar. Además, es súper saludable!',
        rating: 4,
        date: new Date('2023-04-23T20:00:00.000Z'),
      },
      {
        username: 'papachef',
        title: 'Muy buena',
        rating: 5,
        date: new Date('2023-04-29T20:00:00.000Z'),
      },
    ],
  };

  const postHandler = () => {
    const newComment = comment
      ? {
          username: 'prueba',
          title: reviewTitle,
          rating: rating,
          date: Date.now(),
          comment: comment,
        }
      : {
          username: 'prueba',
          title: reviewTitle,
          rating: rating,
          date: Date.now(),
        };
    console.log(newComment);
    toggleShow();
  };

  const commentHandler = (e: any) => {
    setComment(e.target.value);
  };

  const titleHandler = (e: any) => {
    setReviewTitle(e.target.value);
  };

  const valoration =
    recipe.valorations.reduce((acc, valoration) => acc + valoration.rating, 0) /
    recipe.valorations.length;

  return (
    <Card style={styles.card} testid='form-card'>
      <div className={styles.container}>
        <div className={styles.top__section}>
          <div className={styles.left__subsection}>
            <Title style={styles.title}>{recipe.name}</Title>
            <div className={styles.field} data-testid='form-field'>
              <div className={styles.user__info}>
                <Avatar
                  source={recipe.image.url}
                  username={recipe.username}
                  link={`/${recipe.username}`}
                  size={30}
                  style={styles.avatar}
                />
                <Link
                  href={`/${recipe.username}`}
                  className={styles.user__name}
                >
                  <p>@{recipe.username}</p>
                </Link>
                <p>
                  &middot;&nbsp;&nbsp;
                  {timeAgo.format(recipe.date)}
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
              </div>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat} data-testid='form-field'>
                <p className={styles.field__title}>Valoración</p>
                <div className={styles.stat__data}>
                  <GrStar className={styles.star__icon} size={20} />
                  <p className={styles.stat__number}>{valoration}</p>
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
                <BsBookmarkFill className={styles.save__button} />
                <p className={styles.saves__count}>
                  {recipe.likes.length > 1000
                    ? `${recipe.saves.length / 1000}k`
                    : recipe.saves.length}
                </p>
                <BsHeartFill className={styles.like__button} />
                <p className={styles.likes__count}>
                  {recipe.likes.length > 1000
                    ? `${recipe.likes.length / 1000}k`
                    : recipe.likes.length}
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
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    <div className={styles.ingredient}>
                      <p>
                        {ingredient.quantity} {ingredient.unit} de{' '}
                        {ingredient.name}
                      </p>
                    </div>
                    {index < recipe.ingredients.length - 1 && <hr />}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.right__subsection}>
            <div className={styles.field} data-testid='form-field'>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <p className={styles.field__title}>Pasos</p>
              </div>
              <div>
                {recipe.instructions.map((instruction, index) => (
                  <div key={index}>
                    <div className={styles.instruction}>
                      <div className={styles.instruction__number}>
                        {index + 1}
                      </div>
                      <p className={styles.step}>{instruction.step}</p>
                    </div>
                    {index < recipe.instructions.length - 1 && <hr />}
                  </div>
                ))}
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
              {!show && (
                <Button style={styles.add__button} onClick={toggleShow}>
                  <BiEditAlt />
                  Escribir&nbsp;reseña
                </Button>
              )}
            </div>
            <div className={styles.valoration__mean}>
              <p className={styles.mean}>{valoration}</p>
              <ReactStars
                count={5}
                size={30}
                color2='#F5A524'
                value={valoration}
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
                      onClick={postHandler}
                      disabled={reviewTitle ? false : true}
                    >
                      Enviar
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
                  onChange={titleHandler}
                />
                <textarea
                  className={styles.comment__input}
                  placeholder='Reseña (opcional)'
                  onChange={commentHandler}
                  rows={2}
                  style={{ resize: 'none', height: 'auto' }}
                />
              </div>
            )}
            <div>
              {recipe.valorations.map((valoration, index) => (
                <div key={index}>
                  <Review valoration={valoration} />
                  {index < recipe.valorations.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecipePage;
