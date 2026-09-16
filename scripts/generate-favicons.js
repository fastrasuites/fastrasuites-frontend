const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Helper: Convert raw BGRA buffer to Windows ICO DIB format
function imageToDIB(rawBuffer, width, height) {
  const bih = Buffer.alloc(40);
  bih.writeUInt32LE(40, 0); // biSize
  bih.writeInt32LE(width, 4); // biWidth
  bih.writeInt32LE(height * 2, 8); // biHeight (doubled for ICO XOR + AND mask)
  bih.writeUInt16LE(1, 12); // biPlanes
  bih.writeUInt16LE(32, 14); // biBitCount
  bih.writeUInt32LE(0, 16); // biCompression (BI_RGB)
  
  const xorSize = width * height * 4;
  const andRowBytes = Math.ceil(width / 32) * 4;
  const andSize = andRowBytes * height;
  bih.writeUInt32LE(xorSize + andSize, 20); // biSizeImage

  const xorData = Buffer.alloc(xorSize);
  const andData = Buffer.alloc(andSize);

  // Rows from bottom to top
  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y;
    for (let x = 0; x < width; x++) {
      const srcIdx = (srcY * width + x) * 4;
      const dstIdx = (y * width + x) * 4;
      const r = rawBuffer[srcIdx];
      const g = rawBuffer[srcIdx + 1];
      const b = rawBuffer[srcIdx + 2];
      const a = rawBuffer[srcIdx + 3];

      xorData[dstIdx] = b;
      xorData[dstIdx + 1] = g;
      xorData[dstIdx + 2] = r;
      xorData[dstIdx + 3] = a;

      if (a === 0) {
        const byteIdx = y * andRowBytes + Math.floor(x / 8);
        const bitIdx = 7 - (x % 8);
        andData[byteIdx] |= (1 << bitIdx);
      }
    }
  }

  return Buffer.concat([bih, xorData, andData]);
}

async function createIco(sizes, iconSourceBuffer) {
  const dibs = [];
  for (const s of sizes) {
    const { data } = await sharp(iconSourceBuffer)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .raw()
      .toBuffer({ resolveWithObject: true });
    dibs.push({ size: s, buffer: imageToDIB(data, s, s) });
  }

  const numImages = dibs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(numImages, 4); // count

  let offset = 6 + 16 * numImages;
  const entries = [];
  const buffers = [];

  for (const item of dibs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 0); // width
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    buffers.push(item.buffer);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...buffers]);
}

async function generate() {
  const logoPath = path.join(__dirname, '..', 'public', 'fastrasuite-logo.png');
  console.log('Reading:', logoPath);

  // Extract the icon mark (x: 0..124, y: 0..156)
  const extractedMark = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: 124, height: 156 })
    .toBuffer();

  // Resize mark to height 400 with contained aspect ratio for 512x512 canvas
  const resizedMark = await sharp(extractedMark)
    .resize({ height: 400, fit: 'contain' })
    .toBuffer();

  // 1. Transparent 512x512 icon
  const icon512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: resizedMark, gravity: 'center' }])
  .png()
  .toBuffer();

  // 2. Apple Touch Icon 180x180 with navy background (#0B1528)
  const appleResized = await sharp(extractedMark)
    .resize({ height: 130, fit: 'contain' })
    .toBuffer();

  const appleIcon = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 11, g: 21, b: 40, alpha: 1 }
    }
  })
  .composite([{ input: appleResized, gravity: 'center' }])
  .png()
  .toBuffer();

  // 3. Multi-resolution ICO (16x16, 32x32, 48x48)
  const icoBuffer = await createIco([16, 32, 48], icon512);

  // 4. PWA 192x192 icon
  const icon192 = await sharp(icon512).resize(192, 192).png().toBuffer();

  // Write files
  const appDir = path.join(__dirname, '..', 'app');
  const publicDir = path.join(__dirname, '..', 'public');

  // app/ directory icons (used by Next.js file-based metadata)
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'icon.png'), icon512);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIcon);

  // public/ directory icons (used for static serving)
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), icon512);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), appleIcon);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);

  console.log('All favicon and icon files successfully generated!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
