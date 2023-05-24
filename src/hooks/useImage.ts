import { useEffect, useState } from 'react';

// Custom hook to get image url from file
export function useImage() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    } else {
      setImageUrl(null);
    }
  }, [image]);

  // Function to handle image change
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };
  return { image, imageUrl, onImageChange, setImage };
}
