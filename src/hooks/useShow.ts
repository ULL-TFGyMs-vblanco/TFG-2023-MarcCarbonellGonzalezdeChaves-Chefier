import { useState } from 'react';

export default function useShow(): [boolean, () => void] {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((show) => !show);
  };

  return [show, toggleShow];
}
