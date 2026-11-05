import fs from 'node:fs';
import zlib from 'node:zlib';

/**
 * Minimal pure Node.js PNG encoder without external dependencies.
 * Creates clean RGB/RGBA PNG images with CRC32 verification.
 */
function createPng(width, height, getPixel) {
  // CRC table
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }

  function crc32(buf, start, len) {
    let crc = 0xffffffff;
    for (let i = start; i < start + len; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crcVal = crc32(buf, 4, 4 + len);
    buf.writeUInt32BE(crcVal, 8 + len);
    return buf;
  }

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR: width(4), height(4), bitDepth=8(1), colorType=6 (RGBA)(1), comp=0(1), filter=0(1), interlace=0(1)
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image scanlines: filter byte (0) + 4 bytes per pixel
  const rowStride = 1 + width * 4;
  const rawData = Buffer.alloc(rowStride * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowStride;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // IDAT chunk with compressed scanlines
  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function renderDoorMasterIcon(isMaskable) {
  return (x, y, width, height) => {
    const u = x / width;
    const v = y / height;
    const cx = 0.5;
    const cy = 0.5;
    const dx = u - cx;
    const dy = v - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Dark sleek navy background: gradient from #0f172a to #0284c7
    const bgR = Math.round(15 + u * 15 + v * 5);
    const bgG = Math.round(23 + u * 40 + v * 60);
    const bgB = Math.round(42 + u * 80 + v * 120);

    // If maskable, bleed full background. If standard, round the corners (radius 22%)
    if (!isMaskable) {
      // Rounded rect mask
      const rx = 0.22;
      const qx = Math.max(Math.abs(dx) - (0.5 - rx), 0);
      const qy = Math.max(Math.abs(dy) - (0.5 - rx), 0);
      const cornerDist = Math.sqrt(qx * qx + qy * qy);
      if (cornerDist > rx) {
        return [0, 0, 0, 0]; // transparent
      }
    }

    // Outer door frame box in the center (u in [0.26, 0.74], v in [0.20, 0.80])
    const pad = isMaskable ? 0.08 : 0;
    const fLeft = 0.26 + pad * 0.5;
    const fRight = 0.74 - pad * 0.5;
    const fTop = 0.18 + pad;
    const fBottom = 0.82 - pad;

    // Door Frame border
    if (u >= fLeft && u <= fRight && v >= fTop && v <= fBottom) {
      const borderThickness = 0.035;
      const isFrameBorder = (u < fLeft + borderThickness || u > fRight - borderThickness || v < fTop + borderThickness || v > fBottom - borderThickness);
      if (isFrameBorder) {
        return [56, 189, 248, 255]; // Light sky blue frame #38bdf8
      }

      // Inside frame: Door slab with perspective open angle (emerald green)
      const slabLeft = fLeft + borderThickness + 0.02;
      const slabRight = fRight - borderThickness - 0.04;
      const slabTop = fTop + borderThickness + (u - slabLeft) * 0.08;
      const slabBottom = fBottom - borderThickness - (u - slabLeft) * 0.08;

      if (u >= slabLeft && u <= slabRight && v >= slabTop && v <= slabBottom) {
        // Door Handle / Lock
        const handleX = slabRight - 0.06;
        const handleY = 0.50;
        const handleDist = Math.sqrt((u - handleX) ** 2 + (v - handleY) ** 2);
        if (handleDist < 0.032) {
          return [255, 255, 255, 255]; // Chrome White Lock
        }
        if (handleDist < 0.016) {
          return [15, 23, 42, 255]; // Keyhole
        }

        // Emerald door finish with vertical grain gradient
        const emR = Math.round(16 + (v - fTop) * 20);
        const emG = Math.round(185 - (v - fTop) * 50);
        const emB = Math.round(129 - (u - fLeft) * 40);
        return [emR, emG, emB, 255];
      }

      // Interior dark doorway gap
      return [15, 23, 42, 255];
    }

    return [bgR, bgG, bgB, 255];
  };
}

// Generate PWA icons
fs.mkdirSync('./public', { recursive: true });

console.log('Generating 192x192 PNG icon...');
const png192 = createPng(192, 192, renderDoorMasterIcon(false));
fs.writeFileSync('./public/pwa-192x192.png', png192);

console.log('Generating 512x512 PNG icon...');
const png512 = createPng(512, 512, renderDoorMasterIcon(false));
fs.writeFileSync('./public/pwa-512x512.png', png512);

console.log('Generating 512x512 maskable PNG icon...');
const pngMaskable512 = createPng(512, 512, renderDoorMasterIcon(true));
fs.writeFileSync('./public/pwa-maskable-512x512.png', pngMaskable512);

console.log('Generating 180x180 apple-touch-icon PNG...');
const appleIcon = createPng(180, 180, renderDoorMasterIcon(false));
fs.writeFileSync('./public/apple-touch-icon.png', appleIcon);

console.log('All PWA PNG icons successfully generated in ./public/');
