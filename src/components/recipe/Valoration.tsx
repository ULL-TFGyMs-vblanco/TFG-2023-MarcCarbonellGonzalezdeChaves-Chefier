import { Valoration as ValorationType } from 'recipe-types';
import { Avatar } from '../ui/Avatar';
import styles from '../../styles/recipe/Valoration.module.css';
import TimeAgo from 'javascript-time-ago';
import Link from 'next/link';
import { useLoggedUser } from '@/hooks/useLoggedUser';
import { useSession } from 'next-auth/react';
import { BsFillTrashFill } from 'react-icons/bs';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { CustomModal } from '../ui/CustomModal';
import { Loading } from '@nextui-org/react';
import ReactStars from 'react-stars';

const timeAgo = new TimeAgo('es-ES');

interface ValorationProps {
  valoration: ValorationType;
  deleteHandler: () => Promise<void>;
}

export const Valoration: React.FC<ValorationProps> = ({
  valoration,
  deleteHandler,
}) => {
  const [valorationModalVisible, setValorationModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();
  const { user } = useLoggedUser();

  const handleDelete = async () => {
    setIsDeleting(true);
    setValorationModalVisible(false);
    await deleteHandler();
  };

  return (
    <>
      <div className={styles.valoration}>
        <div className={styles.valoration__metadata}>
          <div className={styles.valoration__user}>
            <Avatar
              source={valoration.user.image}
              username={valoration.user.name}
              link={`/${valoration.user.name}`}
              size={20}
              className={styles.avatar}
            />
            <Link
              href={`/${valoration.user.name}`}
              className={styles.user__name}
            >
              <p>@{valoration.user.name}</p>
            </Link>
          </div>
          <p className={styles.valoration__date}>
            {timeAgo.format(Date.parse(valoration.date))}
          </p>
        </div>
        <p className={styles.valoration__title}>{valoration.title}</p>
        <div className={styles.valoration__rating}>
          <ReactStars
            count={5}
            size={20}
            color2='#F5A524'
            value={valoration.rating}
            edit={false}
          />
        </div>
        {valoration.comment && (
          <div>
            <p>{valoration.comment}</p>
          </div>
        )}
        {session && user && user._id == valoration.user.id && (
          <div className={styles.delete__button__container}>
            <Button
              className={styles.delete__button}
              onClick={() => setValorationModalVisible(true)}
            >
              {isDeleting ? (
                <Loading />
              ) : (
                <>
                  <BsFillTrashFill />
                  Eliminar reseña
                </>
              )}
            </Button>
          </div>
        )}
      </div>
      <CustomModal
        title='¿Estás seguro de que quieres eliminar tu reseña?'
        type='warning'
        visible={valorationModalVisible}
        handler={setValorationModalVisible}
        onClose={handleDelete}
      >
        Esta acción no se puede deshacer.
      </CustomModal>
    </>
  );
};
