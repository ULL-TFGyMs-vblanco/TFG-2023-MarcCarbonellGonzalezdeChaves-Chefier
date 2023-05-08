import { Valoration } from 'recipe-types';
import { Avatar } from '../ui/Avatar';
import { GrStar } from 'react-icons/gr';
import styles from '../../styles/recipe/Review.module.css';
import TimeAgo from 'javascript-time-ago';
import Link from 'next/link';

const timeAgo = new TimeAgo('es-ES');

interface ReviewProps {
  valoration: Valoration;
}

export const Review: React.FC<ReviewProps> = ({ valoration }) => {
  return (
    <div className={styles.review}>
      <div className={styles.review__metadata}>
        <div className={styles.review__user}>
          <Avatar
            source={valoration.user.image}
            username={valoration.user.name}
            link={`/profile/${valoration.user.name}`}
            size={20}
            style={styles.avatar}
          />
          <Link href={`/${valoration.user.name}`} className={styles.user__name}>
            <p>@{valoration.user.name}</p>
          </Link>
        </div>
        <p className={styles.review__date}>
          {timeAgo.format(Date.parse(valoration.date.toString()))}
        </p>
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
