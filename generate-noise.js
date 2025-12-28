// Generate a noise texture PNG
const fs = require('fs');
const { createCanvas } = require('canvas');

const size = 64;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

const imageData = ctx.createImageData(size, size);
const data = imageData.data;

// Generate grayscale noise
for (let i = 0; i < data.length; i += 4) {
  const noise = Math.floor(Math.random() * 256);
  data[i] = noise;     // Red
  data[i + 1] = noise; // Green
  data[i + 2] = noise; // Blue
  data[i + 3] = 255;   // Alpha (fully opaque)
}

ctx.putImageData(imageData, 0, 0);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./static/noise.png', buffer);
console.log('✓ Generated noise.png (64x64)');
