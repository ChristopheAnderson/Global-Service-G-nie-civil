import { useEffect } from 'react';

/**
 * useModalScrollLock:
 * Automatically disables document body scrolling and stops Lenis smooth scroll
 * whenever a modal is open. Restores normal scrolling upon unmount or when closed.
 */
export const useModalScrollLock = (isOpen: boolean, lenisInstance?: any) => {
  useEffect(() => {
    if (!isOpen) return;

    // 1. Lock document body
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Compensate scrollbar width to prevent horizontal layout shift
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // 2. Halt Lenis smooth wheel listener so it doesn't intercept modal scroll
    const activeLenis = lenisInstance || (typeof window !== 'undefined' ? (window as any).__lenis : null);
    if (activeLenis && typeof activeLenis.stop === 'function') {
      activeLenis.stop();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      
      const resumingLenis = lenisInstance || (typeof window !== 'undefined' ? (window as any).__lenis : null);
      if (resumingLenis && typeof resumingLenis.start === 'function') {
        resumingLenis.start();
      }
    };
  }, [isOpen, lenisInstance]);
};
