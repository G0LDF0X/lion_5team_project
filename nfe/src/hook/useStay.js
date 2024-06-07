import { useState, useEffect } from "react";

export default function useStay() {
  const [stayTime, setStayTime] = useState(0);

  useEffect(() => {
    const startTime = new Date().getTime();

    const calculateStayTime = () => {
      const endTime = new Date().getTime();
      const timeSpent = endTime - startTime;
      setStayTime(timeSpent);
    };

    window.addEventListener('beforeunload', calculateStayTime);

    return () => {
      calculateStayTime();
      window.removeEventListener('beforeunload', calculateStayTime);
    };
  }, []);

  return stayTime;
}
