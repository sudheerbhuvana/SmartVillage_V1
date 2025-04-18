import { useState, useEffect } from 'react';

const useOfflineStatus = (): boolean => {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const handleOnline = (): void => {
      setIsOffline(false);
    };

    // console.log('isOffline', isOffline);
    // console.log('navigator.onLine', navigator.onLine);

    const handleOffline = (): void => {
      setIsOffline(true);
    };

    // if (isOffline !== navigator.onLine) {
    //   setIsOffline(!navigator.onLine);
    //   console.log('isOffline', isOffline);
    // }
    // if(typeof window === 'undefined') {
    //   return false;
    // }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return (): void => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  return isOffline;
};

export default useOfflineStatus;