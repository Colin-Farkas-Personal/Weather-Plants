import { readable } from 'svelte/store';

function getIsDesktop() {
  const breakpointMobile = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-mobile');

  return window.innerWidth >= parseInt(breakpointMobile);
}

export const screenSize = readable({ isDesktop: false }, (set) => {

  function checkResize() {
    set({ isDesktop: getIsDesktop() });
  }

  if (typeof window !== 'undefined') {
    // Set initial value
    checkResize();

    window.addEventListener('resize', checkResize);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', checkResize);
    }
  };
});