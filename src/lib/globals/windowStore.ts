import type { WindowOrientation } from '$lib/types/window';
import { readable } from 'svelte/store';


function getCurrentOrientation(): WindowOrientation {
  const isPortrait = window.matchMedia('(orientation: portrait)');
  return isPortrait.matches ? 'portrait': 'landscape';
}

export const windowOrientation = readable<WindowOrientation>('portrait', (set) => {

  function handleResize() {
    set(getCurrentOrientation());
  }

  if (typeof window !== 'undefined') {
    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
  };
});