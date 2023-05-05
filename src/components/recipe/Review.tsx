import { Valoration } from 'recipe-types';
import { Avatar } from '../ui/Avatar';
import { useUser } from '../../hooks/useUser';
import { Loading } from '@nextui-org/react';
import { GrStar } from 'react-icons/gr';
import styles from '../../styles/recipe/Review.module.css';
import TimeAgo from 'javascript-time-ago';
import Link from 'next/link';

const timeAgo = new TimeAgo('es-ES');

interface ReviewProps {
  valoration: Valoration;
}

export const Review: React.FC<ReviewProps> = ({ valoration }) => {
  const { user, isLoading, isError } = useUser('email', valoration.username);

  return (
    <div className={styles.review}>
      <div className={styles.review__metadata}>
        <div className={styles.review__user}>
          {isLoading ? (
            <Loading />
          ) : (
            <Avatar
              source={
                isError
                  ? `https://ik.imagekit.io/czvxqgafa/images/avatar_default.jpg`
                  : user.avatarUrl
              }
              username={valoration.username}
              link={`/profile/${valoration.username}`}
              size={20}
              style={styles.avatar}
            />
          )}
          <Link href={`/${valoration.username}`} className={styles.user__name}>
            <p>@{valoration.username}</p>
          </Link>
        </div>
        <p className={styles.review__date}>{timeAgo.format(valoration.date)}</p>
      </div>
      <p className={styles.review__title}>{valoration.title}</p>
      <div className={styles.valoration__rating}>
        {[...Array(5)].map((_, index) => (
          <GrStar
            className={
              index < valoration.rating
                ? styles.star__active
                : styles.star__inactive
            }
            key={index}
            size={18}
          />
        ))}
      </div>
      {valoration.comment && (
        <div>
          <p>{valoration.comment}</p>
        </div>
      )}
    </div>
  );
};
