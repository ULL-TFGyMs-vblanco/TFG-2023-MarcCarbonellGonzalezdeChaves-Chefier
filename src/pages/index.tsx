import styles from 'src/styles/home/Home.module.css';
import { RecipeList } from '../components/recipe/RecipeList';
import { Card } from '@/components/ui/Card';
import { Title } from '@/components/ui/Title';
import { useRouter } from 'next/router';
import { encode } from 'querystring';

export default function Home() {
  const router = useRouter();

  return (
    <Card>
      <div className={styles.container}>
        <Title lg>Inicio</Title>
        <RecipeList filters={encode(router.query)} />
      </div>
    </Card>
  );
}
