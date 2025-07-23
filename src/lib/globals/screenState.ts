import { readable } from 'svelte/store';

function getIsDesktop() {
  return window.innerWidth >= 850;
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