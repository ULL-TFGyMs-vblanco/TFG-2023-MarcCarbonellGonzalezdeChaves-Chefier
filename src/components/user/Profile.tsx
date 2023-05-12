import { User } from 'user-types';
import styles from '../../styles/user/Profile.module.css';
import { Avatar } from '../ui/Avatar';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RecipeList } from '../recipe/RecipeList';
import { useFollow } from '@/hooks/useFollow';
import { useLoggedUser } from '@/hooks/useLoggedUser';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { user: loggedUser } = useLoggedUser();
  const { follow, unfollow } = useFollow(loggedUser, user);

  const tabHandler = async (tab: string) => {
    router.push(`/${user.username}${tab}`);
  };

  const followHandler = async () => {
    if (!session) {
      await router.push('/auth/login');
    } else {
      await follow();
    }
  };

  const unfollowHandler = async () => {
    await unfollow();
  };

  return (
    <div className={styles.container}>
      <div className={styles.user__header}>
        <Avatar source={user.image} size={125} username={user.username} />
        <Title>{user.nickname ? user.nickname : user.username}</Title>
        <Title xs style={styles.user__atname}>{`@${user.username}`}</Title>
      </div>
      {session ? (
        loggedUser.following.includes(user._id) ? (
          <Button style={styles.unfollow__btn} onClick={unfollowHandler}>
            Siguiendo
          </Button>
        ) : (
          <Button style={styles.follow__btn} onClick={followHandler}>
            Seguir
          </Button>
        )
      ) : (
        <Button style={styles.unfollow__btn} onClick={unfollowHandler}>
          Siguiendo
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
        {!router.query.tab &&
          (user.recipes.length > 0 ? (
            <RecipeList filters={`user.id=${user._id}`} />
          ) : (
            <Title xs>Todavía no has publicado ninguna receta</Title>
          ))}
        {router.query.tab === 'likes' &&
          (user.likes.length > 0 ? (
            <RecipeList filters={`likes=${user._id}`} />
          ) : (
            <Title xs>Todavía no has dado me gusta a ninguna receta</Title>
          ))}
        {router.query.tab === 'saved' &&
          (user.saved.length > 0 ? (
            <RecipeList filters={`saved=${user._id}`} />
          ) : (
            <Title xs>Todavía no has guardado ninguna receta</Title>
          ))}
      </div>
    </div>
  );
};
