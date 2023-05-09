import styles from 'src/styles/home/Home.module.css';
import { RecipeList } from '../components/recipe/RecipeList';
import { Card } from '@/components/ui/Card';

export default function Home() {
  // const { data: session } = useSession();
  // const [filters, setFilters] = useState<string>();

  // const signOutHandler = async () => {
  //   await signOut();
  // };

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
      </div>
    </Card>
  );
}
