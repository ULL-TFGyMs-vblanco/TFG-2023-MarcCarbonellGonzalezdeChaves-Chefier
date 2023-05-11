import { User } from 'user-types';
import styles from '../../styles/user/Profile.module.css';
import { Avatar } from '../ui/Avatar';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RecipeList } from '../recipe/RecipeList';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const followHandler = async () => {
    if (!session) {
      await router.push('/auth/login');
    } else {
      console.log('follow');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.user__header}>
        <Avatar source={user.image} size={125} username={user.username} />
        <Title>{user.nickname ? user.nickname : user.username}</Title>
        <Title xs style={styles.user__atname}>{`@${user.username}`}</Title>
      </div>
      {session?.user.name !== user.username && (
        <Button style={styles.follow__btn} onClick={followHandler}>
          Seguir
        </Button>
      )}
      <div className={styles.stats}>
        <div className={styles.stats__item}>
          <Title xs>{user.recipes.length}</Title>
          <p className={styles.stat__name}>Recetas</p>
        </div>
        <div className={styles.stats__item}>
          <Title xs>{user.followers.length}</Title>
          <p className={styles.stat__name}>Seguidores</p>
        </div>
        <div className={styles.stats__item}>
          <Title xs>{user.following.length}</Title>
          <p className={styles.stat__name}>Siguiendo</p>
        </div>
      </div>
      {user.recipes.length > 0 ? (
        <RecipeList filters={`user.id=${user._id}`} />
      ) : (
        <Title sm>Todavía no has publicado ninguna receta</Title>
      )}
      {/* {user.likes.length > 0 ? (
        <RecipeList filters={`user.id=${user._id}`} />
      ) : (
        <Title sm>Todavía no has dado me gusta a ninguna receta</Title>
      )}
      {user.saved.length > 0 ? (
        <RecipeList filters={`user.id=${user._id}`} />
      ) : (
        <Title sm>Todavía no has guardado ninguna receta</Title>
      )} */}
    </div>
  );
};
