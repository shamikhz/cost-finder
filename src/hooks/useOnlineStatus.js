import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to monitor online/offline connectivity.
 * Hidden Cost Finder is required to NOT work offline.
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true;
  });
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkConnection = useCallback(async () => {
    setIsChecking(true);
    try {
      if (!navigator.onLine) {
        setIsOnline(false);
        setIsChecking(false);
        return false;
      }
      // Probe network to confirm actual connectivity
      const response = await fetch('/favicon.svg?probe=' + Date.now(), {
        method: 'HEAD',
        cache: 'no-store',
      });
      const online = response.ok;
      setIsOnline(online);
      setIsChecking(false);
      return online;
    } catch {
      setIsOnline(false);
      setIsChecking(false);
      return false;
    }
  }, []);

  return { isOnline, isChecking, checkConnection };
}
