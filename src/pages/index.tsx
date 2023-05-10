import styles from 'src/styles/home/Home.module.css';
import { RecipeList } from '../components/recipe/RecipeList';
import { Card } from '@/components/ui/Card';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { Recipe, ValidUpdate } from 'recipe-types';
import { useSWRConfig } from 'swr';
import RecipeService from '@/services/RecipeService';

const recipe: Recipe = {
  _id: '1234',
  name: 'Ensalada de quinoa y aguacate',
  user: {
    name: 'Javier',
    image: 'https://ik.imagekit.io/czvxqgafa/images/users/demo/javier.jpg',
    id: '1234',
  },
  image: {
    url: 'https://ik.imagekit.io/czvxqgafa/images/posts/demo/ensalada_quinoa_aguacate.jpg',
    fileId: '1234',
  },
  description: 'Una receta saludable y fácil de preparar para una cena ligera.',
  date: '2023-04-23T19:00:00.000Z',
  tags: {
    breakfast: false,
    lunch: true,
    dinner: true,
    dessert: false,
    snack: false,
    drink: false,
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
  saved: ['saludablexsiempre', 'comidafit', 'cocineroencasa'],
  likes: ['chefpepe', 'saludablexsiempre', 'comidafit', 'cocineroencasa'],
  valorations: [
    {
      user: {
        name: 'saludablexsiempre',
        image:
          'https://ik.imagekit.io/czvxqgafa/images/users/demo/saludablexsiempre.jpg',
        id: '1234',
      },
      title: 'Muy rica y fácil de preparar',
      comment: 'Muy rica y fácil de preparar. Además, es súper saludable!',
      rating: 4,
      date: '2023-04-23T20:00:00.000Z',
    },
  ],
};

export default function Home() {
  // const { data: session } = useSession();
  // const [filters, setFilters] = useState<string>();

  // const signOutHandler = async () => {
  //   await signOut();
  // };

  const { mutate } = useSWRConfig();

  const updateHandler = async (recipeId: string, update: ValidUpdate) => {
    try {
      await RecipeService.updateRecipe(`/recipe/${recipeId}`, update);
      await mutate('/recipe/' + recipeId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <div className={styles.container}>
        {/* <Title lg>Inicio</Title>
        {session && (
          <>
            <h1>Logged in as {session.user.name}</h1>
            <h2>email: {session.user.email}</h2>
            <h2>token: {session.user.accessToken}</h2>
            <Button onClick={signOutHandler} testid='logout-button'>
              <span>Log out</span>
            </Button>
          </>
        )} */}
        <RecipeList />
        <RecipeCard recipe={recipe} updateHandler={updateHandler} />
      </div>
    </Card>
  );
}
