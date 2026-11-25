import fs from 'node:fs';

// Standalone Mark SVG
export function createBookMarkSvg({ 
  leftCover = '#263B2B', 
  leftPage = '#E8ECE0', 
  rightCover = '#6E7A52', 
  rightPage = '#7F8D60', 
  docLines = '#FCFCF8',
  spineShadow = 'rgba(0,0,0,0.12)'
} = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 140" width="100%" height="100%">
  <g transform="translate(10, 5)">
    <!-- LEFT BACK COVER / SHADOW -->
    <path d="M 70 125 C 50 114 30 116 16 122 C 12 123.5 8 120.5 8 116 L 8 46 C 8 40.5 13 36.5 18.5 38 L 70 54 Z" 
          fill="${leftCover}" />

    <!-- LEFT OPEN PAGE -->
    <path d="M 70 122 C 54 112 36 113 22 118 L 22 46 C 22 41 26.5 37.5 31.5 39 C 45 43 58 48 70 53 Z" 
          fill="${leftPage}" />

    <!-- RIGHT BACK COVER -->
    <path d="M 70 125 C 90 114 110 116 124 122 C 128 123.5 132 120.5 132 116 L 132 46 C 132 40.5 127 36.5 121.5 38 L 70 54 Z" 
          fill="${rightCover}" />

    <!-- RIGHT OPEN PAGE -->
    <path d="M 70 122 C 86 112 104 113 118 118 L 118 46 C 118 41 113.5 37.5 108.5 39 C 95 43 82 48 70 53 Z" 
          fill="${rightPage}" />

    <!-- SPINE CREASE / SHADOW -->
    <path d="M 69 53 L 71 53 L 71 124 L 69 124 Z" fill="${spineShadow}" />

    <!-- DOCUMENTATION / CODE LINES ON RIGHT PAGE -->
    <rect x="79" y="66" width="26" height="3.5" rx="1.75" fill="${docLines}" />
    <rect x="79" y="75" width="20" height="3.5" rx="1.75" fill="${docLines}" />
    <rect x="79" y="84" width="15" height="3.5" rx="1.75" fill="${docLines}" />
  </g>
</svg>`;
}

fs.writeFileSync('scratch-book.svg', createBookMarkSvg());
console.log('Saved scratch-book.svg');
