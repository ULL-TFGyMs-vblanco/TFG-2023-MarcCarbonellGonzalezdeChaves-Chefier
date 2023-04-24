import { Button } from '../components/ui/Button';
import Link from 'next/link';
import styles from 'src/styles/home/Home.module.css';
import { signOut, useSession } from 'next-auth/react';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types/recipe';

export default function Home() {
  const { data: session } = useSession();

  const recipe: Recipe = {
    name: 'Ensalada de quinoa y aguacate',
    username: 'chefjulia',
    images: [
      'https://ik.imagekit.io/czvxqgafa/images/posts/ensalada_quinoa_aguacate.jpg',
    ],
    description:
      'Una receta saludable y fácil de preparar para una cena ligera.',
    date: new Date('2023-04-23T19:00:00.000Z'),
    tags: ['ensalada', 'quinoa', 'aguacate', 'vegetariano'],
    difficulty: 'Fácil',
    cookTime: 30,
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
      'Enjuagar la quinoa bajo agua fría y escurrir.',
      'Colocar la quinoa en una olla con dos tazas de agua y sal al gusto. Cocinar a fuego medio hasta que la quinoa esté cocida, aproximadamente 15 minutos.',
      'Mientras tanto, picar la cebolla, el pimiento y el tomate cherry. Cortar los aguacates en cubos y rociar con limón para evitar que se oxiden.',
      'Una vez cocida la quinoa, dejar enfriar.',
      'Mezclar la quinoa con los vegetales picados y el aceite de oliva.',
      'Agregar sal y pimienta al gusto.',
      'Servir frío y disfrutar!',
    ],
    valoration: 4,
    valorations: [
      {
        username: 'saludablexsiempre',
        comment: 'Muy rica y fácil de preparar. Además, es súper saludable!',
        rating: 4,
        date: new Date('2023-04-23T20:00:00.000Z'),
        comments: [
          {
            username: 'comidafit',
            comment:
              'La ensalada de quinoa es mi favorita y esta receta no decepciona.',
            date: new Date('2023-04-23T21:00:00.000Z'),
          },
          {
            username: 'cocineroencasa',
            comment: 'Le agregué un poco de queso feta y quedó deliciosa!',
            date: new Date('2023-04-24T10:00:00.000Z'),
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1>Chefier</h1>
      <Button testid='register-button'>
        <Link href='/auth/register'>Register</Link>
      </Button>
      {session && (
        <>
          <h1>Logged in as {session.user.name}</h1>
          <h2>email: {session.user.email}</h2>
          <h2>image: {session.user.image}</h2>
          <Button onClick={() => signOut()} testid='logout-button'>
            <span>Log out</span>
          </Button>
        </>
      )}
      <RecipeCard recipe={recipe} />
    </div>
  );
}
