import Link from 'next/link';
import Image from 'next/image';

// Props for Avatar component
interface AvatarProps {
  // Url of the avatar image
  source: string;
  // Size of the avatar
  size: number;
  // Username of the avatar's user
  username: string;
  // Component class name
  className?: string;
  // Test id for testing purposes
  testid?: string;
  // Link to the user's profile
  link?: string;
  // Function to be executed on click
  onClick?: () => void;
}

// Avatar component
export const Avatar: React.FC<AvatarProps> = ({
  source,
  size,
  username,
  className,
  testid,
  link,
  onClick,
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
          onClick={onClick}
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
