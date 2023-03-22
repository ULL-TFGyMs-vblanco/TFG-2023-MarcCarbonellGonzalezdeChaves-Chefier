import { useRouter } from 'next/router';

const Error = () => {
  const { query } = useRouter();
  const error = query.error;

  return <h1>{error}</h1>;
};

export default Error;
