"use client";

import type { CSSProperties } from "react";

/* --------------------------------------------------------------------------
   QR code for the TestFlight invite (https://testflight.apple.com/join/5pGQhfQq),
   generated once with `qrcode` at error-correction level M, 37 modules with a
   four-module quiet zone, and inlined so the modules are drawn in the current
   text colour and follow the page's appearance.
   -------------------------------------------------------------------------- */

const MODULES =
  "M4 4.5h7m4 0h2m1 0h1m2 0h3m2 0h7M4 5.5h1m5 0h1m1 0h3m3 0h2m1 0h3m2 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m9 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h1m1 0h6m1 0h3m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h1m2 0h2m2 0h1m2 0h2m2 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m2 0h3m1 0h1m1 0h5m2 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M17 11.5h7M4 12.5h1m1 0h1m1 0h1m1 0h1m3 0h1m1 0h2m3 0h2m5 0h1m2 0h1M6 13.5h1m4 0h1m2 0h2m8 0h3m2 0h1m2 0h1M4 14.5h2m1 0h2m1 0h1m1 0h2m1 0h2m1 0h1m2 0h1m3 0h2m1 0h1m1 0h3M8 15.5h1m2 0h1m1 0h1m3 0h1m2 0h2m1 0h1m1 0h2m4 0h1M5 16.5h1m4 0h1m2 0h1m2 0h2m1 0h3m2 0h4m1 0h1m1 0h2M4 17.5h1m1 0h1m2 0h1m1 0h5m1 0h1m3 0h1m2 0h3m2 0h1m2 0h1M4 18.5h1m2 0h1m2 0h1m1 0h6m2 0h3m1 0h2m1 0h1m1 0h1m1 0h2M5 19.5h3m1 0h1m1 0h5m1 0h1m2 0h3m1 0h2m1 0h1m1 0h1m1 0h1M6 20.5h3m1 0h2m1 0h3m3 0h3m1 0h5m1 0h1m1 0h2M6 21.5h1m2 0h1m7 0h2m1 0h1m4 0h2m2 0h2m1 0h1M4 22.5h1m3 0h1m1 0h2m1 0h1m1 0h1m2 0h1m2 0h1m2 0h1m2 0h2m2 0h2M5 23.5h1m2 0h2m1 0h1m1 0h3m1 0h3m1 0h4m4 0h1m1 0h1M4 24.5h1m1 0h2m2 0h5m2 0h1m1 0h3m2 0h5M12 25.5h7m1 0h1m3 0h1m3 0h1m1 0h3M4 26.5h7m3 0h2m2 0h1m4 0h2m1 0h1m1 0h2m1 0h2M4 27.5h1m5 0h1m4 0h4m1 0h3m1 0h1m3 0h2m1 0h2M4 28.5h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h5m1 0h5M4 29.5h1m1 0h3m1 0h1m2 0h1m3 0h1m2 0h1m2 0h1m3 0h2m1 0h3M4 30.5h1m1 0h3m1 0h1m1 0h1m3 0h2m2 0h2m5 0h3m2 0h1M4 31.5h1m5 0h1m3 0h1m1 0h2m3 0h4m2 0h1m3 0h1M4 32.5h7m1 0h2m2 0h1m2 0h3m1 0h3m1 0h3m1 0h2";

export function TestFlightQR({
  size = 176,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="4 4 29 29"
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR code for the Ziva Meds TestFlight invite"
      className={className}
      style={style}
    >
      <path d={MODULES} stroke="currentColor" fill="none" />
    </svg>
  );
}
