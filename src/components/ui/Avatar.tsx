import Link from 'next/link';
import Image from 'next/image';

interface AvatarProps {
  source: string;
  size: number;
  username: string;
  style?: string;
  testid?: string;
  link: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size,
  username,
  style,
  testid,
  link,
}) => {
  return (
    <Link
      className={style}
      href={link}
      data-testid={testid}
      style={{ borderRadius: '50%', display: 'block' }}
    >
      <Image
        src={source}
        alt={`${username} avatar`}
        width={size}
        height={size}
        style={{ borderRadius: '50%', display: 'block', objectFit: 'cover' }}
      />
    </Link>
  );
};
