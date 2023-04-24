import Image from 'next/image';
import { Card } from './ui/Card';
import styles from 'src/styles/RecipeCard.module.css';
import { AiFillStar } from 'react-icons/ai';
import { Recipe } from 'src/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  // const recipe = {
  //   name: 'Ensalada de quinoa y aguacate',
  //   username: 'chefjulia',
  //   images: [
  //     'https://ik.imagekit.io/czvxqgafa/images/posts/ensalada_quinoa_aguacate.jpg',
  //   ],
  //   description:
  //     'Una receta saludable y fácil de preparar para una cena ligera.',
  //   date: '2023-04-23T19:00:00.000Z',
  //   tags: ['ensalada', 'quinoa', 'aguacate', 'vegetariano'],
  //   difficulty: 'Fácil',
  //   cookTime: 30,
  //   ingredients: [
  //     { name: 'quinoa', quantity: 1, unit: 'taza' },
  //     { name: 'aguacate', quantity: 2, unit: 'unidades' },
  //     { name: 'tomate cherry', quantity: 1, unit: 'taza' },
  //     { name: 'cebolla morada', quantity: 1, unit: 'unidad' },
  //     { name: 'pimiento rojo', quantity: 1, unit: 'unidad' },
  //     { name: 'limón', quantity: 1, unit: 'unidad' },
  //     { name: 'aceite de oliva', quantity: 2, unit: 'cucharadas' },
  //     { name: 'sal', quantity: 1, unit: 'pizca' },
  //     { name: 'pimienta negra', quantity: 1, unit: 'pizca' },
  //   ],
  //   instructions: [
  //     'Enjuagar la quinoa bajo agua fría y escurrir.',
  //     'Colocar la quinoa en una olla con dos tazas de agua y sal al gusto. Cocinar a fuego medio hasta que la quinoa esté cocida, aproximadamente 15 minutos.',
  //     'Mientras tanto, picar la cebolla, el pimiento y el tomate cherry. Cortar los aguacates en cubos y rociar con limón para evitar que se oxiden.',
  //     'Una vez cocida la quinoa, dejar enfriar.',
  //     'Mezclar la quinoa con los vegetales picados y el aceite de oliva.',
  //     'Agregar sal y pimienta al gusto.',
  //     'Servir frío y disfrutar!',
  //   ],
  //   valoration: 4,
  //   valorations: [
  //     {
  //       username: 'saludablexsiempre',
  //       comment: 'Muy rica y fácil de preparar. Además, es súper saludable!',
  //       rating: 4,
  //       date: '2023-04-23T20:00:00.000Z',
  //       comments: [
  //         {
  //           username: 'comidafit',
  //           comment:
  //             'La ensalada de quinoa es mi favorita y esta receta no decepciona.',
  //           date: '2023-04-23T21:00:00.000Z',
  //         },
  //         {
  //           username: 'cocineroencasa',
  //           comment: 'Le agregué un poco de queso feta y quedó deliciosa!',
  //           date: '2023-04-24T10:00:00.000Z',
  //         },
  //       ],
  //     },
  //   ],
  // };
  // const recipe = {
  //   name: 'Pollo al horno con limón y hierbas',
  //   username: 'chefpepe',
  //   images: [
  //     'https://ik.imagekit.io/czvxqgafa/images/posts/pollo_al_limon.jpg',
  //   ],
  //   description:
  //     'Una receta deliciosa y fácil de preparar para el almuerzo o cena.',
  //   date: '2022-10-15T15:30:00.000Z',
  //   tags: ['pollo', 'horno', 'limón', 'hierbas'],
  //   difficulty: 'Fácil',
  //   cookTime: 60,
  //   ingredients: [
  //     { name: 'pollo entero', quantity: 1, unit: 'unidad' },
  //     { name: 'limón', quantity: 2, unit: 'unidad' },
  //     { name: 'tomillo fresco', quantity: 2, unit: 'ramas' },
  //     { name: 'romero fresco', quantity: 2, unit: 'ramas' },
  //     { name: 'ajo', quantity: 3, unit: 'dientes' },
  //     { name: 'aceite de oliva', quantity: 2, unit: 'cucharadas' },
  //     { name: 'sal', quantity: 1, unit: 'pizca' },
  //     { name: 'pimienta negra', quantity: 1, unit: 'pizca' },
  //   ],
  //   instructions: [
  //     'Precalentar el horno a 200°C.',
  //     'Lavar y secar el pollo, y salpimentarlo por dentro y por fuera.',
  //     'Colocar en una fuente para horno y reservar.',
  //     'Exprimir el jugo de un limón en un tazón y mezclar con el aceite de oliva y las hierbas picadas.',
  //     'Verter la mezcla sobre el pollo y frotar para cubrirlo bien.',
  //     'Cortar el otro limón en rodajas y colocarlas dentro del pollo.',
  //     'Introducir los dientes de ajo pelados y enteros en la fuente.',
  //     'Hornear durante 50-60 minutos o hasta que el pollo esté dorado y cocido por completo.',
  //     'Retirar del horno y dejar reposar durante 5-10 minutos antes de cortar y servir.',
  //   ],
  //   valoration: 4.5,
  //   valorations: [
  //     {
  //       username: 'comidista',
  //       comment:
  //         'Esta receta es genial, la he preparado varias veces y siempre queda perfecta.',
  //       rating: 5,
  //       date: '2022-10-16T09:15:00.000Z',
  //       comments: [
  //         {
  //           username: 'cocinillas',
  //           comment: 'Estoy deseando probarla, tiene una pinta estupenda.',
  //           date: '2022-10-16T12:30:00.000Z',
  //         },
  //         {
  //           username: 'gastrolover',
  //           comment:
  //             'Yo la hice con pollo deshuesado y quedó delicioso también.',
  //           date: '2022-10-17T14:00:00.000Z',
  //         },
  //       ],
  //     },
  //   ],
  // };

  return (
    <Card style={styles.recipe__container}>
      <div className={styles.image__container}>
        <Image
          src={recipe.images[0]}
          alt={recipe.name}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{recipe.name}</p>
        <div className={styles.stats}>
          <div className={styles.valoration}>
            <AiFillStar color='yellow' />
            <p>{recipe.valoration}</p>
          </div>
          <hr className={styles.divider} />
          <p className={styles.time}>{recipe.cookTime}min</p>
          <hr className={styles.divider} />
          <p className={styles.difficulty}>{recipe.difficulty}</p>
        </div>
      </div>
    </Card>
  );
};
