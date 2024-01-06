import React, { useEffect, useState } from 'react'

function useTimerCount() {
   const [isTime, setIsTime] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTime(true);
    }, 0);
  });
  return isTime;
}

export default useTimerCount