import { Button } from '../components/ui/Button';
import styles from 'src/styles/home/Home.module.css';
import { signOut, useSession } from 'next-auth/react';
import { recipes } from '../data/recipes';
import { RecipeList } from '../components/recipe/RecipeList';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <h1>Chefier</h1>
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
      <RecipeList recipes={recipes} />
    </div>
  );
}
