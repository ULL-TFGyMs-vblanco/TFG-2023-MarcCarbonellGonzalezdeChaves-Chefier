import { useCallback, useState } from 'react';

export function useToggleMenu() {
  const [firstToggle, setFirstToggle] = useState(true);
  const [toggle, setToggle] = useState(true);

  const handleToggle = useCallback(() => {
    firstToggle ? setFirstToggle(false) : setToggle(!toggle);
  }, [firstToggle, toggle]);

  return { firstToggle, toggle, handleToggle };
}
