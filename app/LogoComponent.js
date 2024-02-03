// LogoComponent.js
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
          fill: #cf7910;
        }
        .flame {
          fill: url(#flameGradient);
          animation: flicker 1s infinite alternate-reverse;
          transform-origin: center bottom;
        }
        @keyframes flicker {
          0% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
          }
        }`}
      </style>

      {/* Gradient definition for the flame */}
      <defs>
        <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'red', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: 'orange', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'yellow', stopOpacity: 1 }} />
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

      {/* Zigzag trendline path with arrowhead */}
      <path
        d="M10,40 l30,-25 l10,20 l20,-25"
        stroke="#cf7910"
        fill="none"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />

      {/* flame shape */}
      <path d="M100,20 Q115,-20 130,20 Q120,0 110,20 Q115,-5 100,20" className="flame" />

      {/* Text label for aitrends.live */}
      <text x="10" y="30" className="trend-text">
        aitrends.live
      </text>
    </svg>
  );
};

export default LogoComponent;
