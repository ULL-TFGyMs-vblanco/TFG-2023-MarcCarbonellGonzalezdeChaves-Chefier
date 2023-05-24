import { useState } from 'react';

// Custom hook to handle if a component is shown or not
export function useShow() {
  const [show, setShow] = useState(false);

  // Function to toggle show
  const toggleShow = () => {
    setShow((show) => !show);
  };

  return { show, toggleShow };
}
