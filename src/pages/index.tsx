import styles from 'src/styles/home/Home.module.css';
import { RecipeList } from '../components/recipe/RecipeList';
import { Card } from '../components/ui/Card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTheme } from '@nextui-org/react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

// Home page
export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('Explorar recetas');

  const { isDark } = useTheme();
  useEffect(() => {
    if (router.query.following) {
      setTitle('Siguiendo');
    } else if (router.query.search) {
      setTitle(`Resultados de búsqueda para "${router.query.search}"`);
    } else {
      setTitle('Explorar');
    }
  }, [router.query]);

  return (
    <Card>
      <div className={styles.container}>
        {isDark ? (
          <BsFillSunFill
            className={styles.sun__theme__icon}
            id='sun'
            size={14}
          />
        ) : (
          <BsFillMoonFill
            className={styles.moon__theme__icon}
            id='moon'
            size={12}
          />
        )}
        <RecipeList filters={router.query} title={title} filterbox />
      </div>
    </Card>
  );
}
