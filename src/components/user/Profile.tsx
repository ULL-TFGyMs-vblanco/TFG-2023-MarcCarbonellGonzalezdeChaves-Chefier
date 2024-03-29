import { User } from 'user-types';
import styles from '../../styles/user/Profile.module.css';
import { Avatar } from '../ui/Avatar';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RecipeList } from '../recipe/RecipeList';
import { useFollow } from '../../hooks/useFollow';
import { useLoggedUser } from '../../hooks/useLoggedUser';
import { decode } from 'querystring';

// Props for Profile component
interface ProfileProps {
  // User to be displayed
  user: User;
}

// Profile component
export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { user: loggedUser } = useLoggedUser();
  const { follow, unfollow } = useFollow(user);

  // Function to handle tab changes
  const tabHandler = async (tab: string) => {
    router.push(`/${user.username}${tab}`);
  };

  // Function to handle follow
  const followHandler = async () => {
    if (!session) {
      await router.push('/auth/login');
    } else {
      await follow();
    }
  };

  // Function to handle unfollow
  const unfollowHandler = async () => {
    await unfollow();
  };

  return (
    <div className={styles.container}>
      <div className={styles.user__header}>
        <Avatar source={user.image} size={125} username={user.username} />
        <Title>{user.nickname ? user.nickname : user.username}</Title>
        <Title xs className={styles.user__atname}>{`@${user.username}`}</Title>
      </div>
      {session && loggedUser ? (
        loggedUser._id !== user._id &&
        (loggedUser.following.includes(user._id) ? (
          <Button className={styles.unfollow__btn} onClick={unfollowHandler}>
            Siguiendo
          </Button>
        ) : (
          <Button className={styles.follow__btn} onClick={followHandler}>
            Seguir
          </Button>
        ))
      ) : (
        <Button className={styles.follow__btn} onClick={followHandler}>
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
      <hr className={styles.divider} />
      <div className={styles.tabs__container}>
        <div
          className={
            router.query.tab ? styles.unselected__tab : styles.selected__tab
          }
          onClick={() => tabHandler('/')}
        >
          <span>Recetas</span>
        </div>
        <div
          className={
            router.query.tab === 'likes'
              ? styles.selected__tab
              : styles.unselected__tab
          }
          onClick={() => tabHandler('?tab=likes')}
        >
          <span>Me gustas</span>
        </div>
        <div
          className={
            router.query.tab === 'saved'
              ? styles.selected__tab
              : styles.unselected__tab
          }
          onClick={() => tabHandler('?tab=saved')}
        >
          <span>Guardados</span>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.recipe__list}>
        {!router.query.tab && (
          <RecipeList filters={decode(`user.id=${user._id}`)} />
        )}
        {router.query.tab === 'likes' && (
          <RecipeList filters={decode(`likes=${user._id}`)} />
        )}
        {router.query.tab === 'saved' && (
          <RecipeList filters={decode(`saved=${user._id}`)} />
        )}
      </div>
    </div>
  );
};
