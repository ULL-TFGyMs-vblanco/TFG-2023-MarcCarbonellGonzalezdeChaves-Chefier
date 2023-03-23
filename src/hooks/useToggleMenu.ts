import { useCallback, useState } from 'react';

export default function useToggleMenu(): [boolean, boolean, () => void] {
  const [firstToggle, setFirstToggle] = useState(true);
  const [toggle, setToggle] = useState(true);

  const handleToggle = useCallback(() => {
    firstToggle ? setFirstToggle(false) : setToggle(!toggle);
  }, [firstToggle, toggle]);

  return [firstToggle, toggle, handleToggle];
}