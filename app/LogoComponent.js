import React from 'react';
const LogoComponent = () => {
  return (
    <svg width="140" height="40" xmlns="http://www.w3.org/2000/svg">
      {/* Define the text style and arrowhead style */}
      <style>
        {`.trend-text {
          font: 22px sans-serif;
          fill: white;
        }
        .arrowhead {
          fill: url(#flameGradient); /* Apply the gradient to the arrowhead */
        }
        .flame {
          fill: url(#flameGradient);
          animation: flicker 1s infinite alternate-reverse;
          transform-origin: center bottom;
        }
        @keyframes flicker {
          0% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
          }
        }`}
      </style>

      {/* Gradient definition for the flame and now for the arrowhead and the line */}
      <defs>
        <linearGradient id="flameGradient" x1="50%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'yellow', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: 'orange', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'red', stopOpacity: 1 }} />
        </linearGradient>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L6,3 L0,6" className="arrowhead" />
        </marker>
      </defs>

      {/* Zigzag trendline path with arrowhead, now using the gradient */}
      <path
        d="M10,40 l22,-25 l10,20 l25,-25"
        stroke="url(#flameGradient)" /* Apply the gradient to the stroke */
        fill="none"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />

      {/* flame shape */}
      <path d="M100,-5 Q115,35 130,-5 Q120,15 110,-5 Q115,20 100,-5" className="flame" />

      {/* Adding a translucent rectangle as a halo for the text */}
      <rect x="5" y="15" width="130" height="20" rx="5" fill="rgba(65, 109, 25, 0.5)" />

      {/* Text label for aitrends.live */}
      <text x="10" y="30" className="trend-text">
        aitrends.live
      </text>
    </svg>
  );
};

export default LogoComponent;
