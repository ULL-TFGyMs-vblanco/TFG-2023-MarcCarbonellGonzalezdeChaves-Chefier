import Link from 'next/link';
import Image from 'next/image';

interface AvatarProps {
  source: string;
  size: number;
  username: string;
  className?: string;
  testid?: string;
  link?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size,
  username,
  className,
  testid,
  link,
}) => {
  return (
    <>
      {link ? (
        <Link
          className={className}
          href={link}
          data-testid={testid}
          style={{
            borderRadius: '50%',
            display: 'block',
            minWidth: `${size}px`,
          }}
        >
          <Image
            src={source}
            alt={`${username} avatar`}
            width={size}
            height={size}
            style={{
              borderRadius: '50%',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        </Link>
      ) : (
        <Image
          src={source}
          alt={`${username} avatar`}
          width={size}
          height={size}
          style={{
            borderRadius: '50%',
            display: 'block',
            objectFit: 'cover',
            minWidth: `${size}px`,
          }}
        />
      )}
    </>
  );
};
