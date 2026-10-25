import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage PWA install prompt lifecycle and installation status.
 */
export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if the app is already running in standalone mode (installed PWA)
    const checkStandalone = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = window.navigator.standalone === true;
      return Boolean(isStandaloneMedia || isIOSStandalone);
    };

    if (checkStandalone()) {
      setIsInstalled(true);
    }

    // Capture beforeinstallprompt event (Chromium browsers)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Listen for successful installation event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = useCallback(async () => {
    if (isInstalled) {
      setIsModalOpen(true);
      return { success: true, installed: true };
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
          return { success: true, outcome: 'accepted' };
        }
        setDeferredPrompt(null);
        return { success: false, outcome: choice?.outcome };
      } catch (err) {
        console.warn('PWA install prompt error:', err);
        setIsModalOpen(true);
        return { success: false, error: err };
      }
    }

    // If native prompt is not directly available (e.g., iOS Safari or already handled),
    // open the guided install modal
    setIsModalOpen(true);
    return { success: false, guided: true };
  }, [deferredPrompt, isInstalled]);

  return {
    isInstallable: Boolean(deferredPrompt) || !isInstalled,
    isInstalled,
    hasNativePrompt: Boolean(deferredPrompt),
    triggerInstall,
    isModalOpen,
    setIsModalOpen,
  };
}
