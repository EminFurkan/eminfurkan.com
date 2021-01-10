import { useEffect, useState } from 'react';
import { supportsPassiveEvents } from './supportsPassiveEvents';

type Callback = (props: {scroll: number, height: number}) => void;

let eventPending = false;
const callbacks: Callback[] = [];

function addListener(callback: Callback) {
  if (callbacks.length === 0) {
    const passive: any = supportsPassiveEvents() ? { passive: true } : false;
    window.addEventListener('scroll', handleEvent, passive);
    window.addEventListener('resize', handleEvent, passive);
  }
  callbacks.push(callback);
}

function removeListener(callback: Callback) {
  const idx = callbacks.indexOf(callback);
  if (idx === -1) {
    return;
  } else if (idx === callbacks.length - 1) {
    callbacks.pop();
  } else {
    callbacks[idx] = callbacks.pop() as any;
  }
  if (callbacks.length === 0) {
    const passive: any = supportsPassiveEvents() ? { passive: true } : false;
    window.removeEventListener('scroll', handleEvent, passive);
    window.removeEventListener('resize', handleEvent, passive);
  }
}

function handleEvent() {
  if (!eventPending) {
    eventPending = true;
    window.requestAnimationFrame(updateCallbacks);
  }
}

function updateCallbacks() {
  eventPending = false;
  const scroll = window.scrollY;
  const height = window.innerHeight;
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i].call(null, { scroll, height });
  }
}

export function useScrollAndHeight(limit?: number): {scroll: number, height: number} {
  const [state, setState] = useState({scroll: 0, height: 800});
  useEffect(() => {
    const update = (next: {scroll: number, height: number}) => {
      if (limit && next.scroll > next.height * limit) {
        next.scroll = next.height * limit;
      }
      setState(
        prev => prev.scroll === next.scroll && prev.height === next.height ? prev : next
      );
    }
    update({ scroll: window.scrollY, height: window.innerHeight });
    addListener(update);
    return () => removeListener(update);
  }, [limit]);
  return state;
}
