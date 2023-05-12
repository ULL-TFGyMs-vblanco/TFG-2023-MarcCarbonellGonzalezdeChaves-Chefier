import { User } from 'user-types';
import styles from '../../styles/user/Profile.module.css';
import { Avatar } from '../ui/Avatar';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RecipeList } from '../recipe/RecipeList';
import { useState } from 'react';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState({
    recipes: true,
    likes: false,
    saved: false,
  });

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
      <hr className={styles.divider} />
      <div className={styles.tabs__container}>
        <div
          className={
            selectedTab.recipes ? styles.selected__tab : styles.unselected__tab
          }
          onClick={() =>
            setSelectedTab({
              recipes: true,
              likes: false,
              saved: false,
            })
          }
        >
          <span>Mis recetas</span>
        </div>
        <div
          className={
            selectedTab.likes ? styles.selected__tab : styles.unselected__tab
          }
          onClick={() =>
            setSelectedTab({
              recipes: false,
              likes: true,
              saved: false,
            })
          }
        >
          <span>Me gustas</span>
        </div>
        <div
          className={
            selectedTab.saved ? styles.selected__tab : styles.unselected__tab
          }
          onClick={() =>
            setSelectedTab({
              recipes: false,
              likes: false,
              saved: true,
            })
          }
        >
          <span>Guardados</span>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.recipe__list}>
        {selectedTab.recipes &&
          (user.recipes.length > 0 ? (
            <RecipeList filters={`user.id=${user._id}`} />
          ) : (
            <Title xs>Todavía no has publicado ninguna receta</Title>
          ))}
        {selectedTab.likes &&
          (user.likes.length > 0 ? (
            <RecipeList filters={`user.id=${user._id}`} />
          ) : (
            <Title xs>Todavía no has dado me gusta a ninguna receta</Title>
          ))}
        {selectedTab.saved &&
          (user.saved.length > 0 ? (
            <RecipeList filters={`user.id=${user._id}`} />
          ) : (
            <Title xs>Todavía no has guardado ninguna receta</Title>
          ))}
      </div>
    </div>
  );
};
