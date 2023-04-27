import { useState } from 'react';

export function useShow(): [boolean, () => void] {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((show) => !show);
  };

  return [show, toggleShow];
}
