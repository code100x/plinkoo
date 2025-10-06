import { useEffect, useState } from 'react';

export enum ViewportType {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
}

export const VIEWPORT_MOBILE_MAX = 767;
export const VIEWPORT_TABLET_MAX = 1023;

function getViewportType(width: number): ViewportType {
  if (width <= VIEWPORT_MOBILE_MAX) return ViewportType.Mobile;
  if (width <= VIEWPORT_TABLET_MAX) return ViewportType.Tablet;
  return ViewportType.Desktop;
}

export function useViewportType(): ViewportType {
  const [viewport, setViewport] = useState<ViewportType>(() =>
    typeof window !== 'undefined'
      ? getViewportType(window.innerWidth)
      : ViewportType.Desktop
  );

  useEffect(() => {
    function handleResize() {
      setViewport(getViewportType(window.innerWidth));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
}
