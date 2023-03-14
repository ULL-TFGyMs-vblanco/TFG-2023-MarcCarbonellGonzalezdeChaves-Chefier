import Link from 'next/link';
import Image from 'next/image';

interface AvatarProps {
  source: string;
  size: number;
  username: string;
  style: string;
  testid: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size,
  username,
  style,
  testid,
}) => {
  return (
    <Link
      className={style}
      href='/profile'
      data-testid={testid}
      style={{ borderRadius: '50%', display: 'block' }}
    >
      <Image
        src={source}
        alt={`${username} avatar`}
        width={size}
        height={size}
        style={{ borderRadius: '50%', display: 'block' }}
      />
    </Link>
  );
};
