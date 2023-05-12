import { Card } from '../../components/ui/Card';
import { Title } from '../../components/ui/Title';
import { Profile } from '../../components/user/Profile';
import { useUser } from '../../hooks/useUser';
import { Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const router = useRouter();
  const { user, isLoading, isError } = useUser(
    'username',
    router.query.username as string
  );
  return (
    <Card testid='form-card'>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Title>Usuario no encontrado</Title>
      ) : (
        user && <Profile user={user} />
      )}
    </Card>
  );
};

export default ProfilePage;
