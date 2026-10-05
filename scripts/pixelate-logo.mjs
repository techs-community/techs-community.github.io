// Script de uso único: gera uma variante "retro pixel" duotone da arte oficial
// da comunidade, sem alterar o arquivo original (design.md §6.2 proíbe
// recolorir/redesenhar a arte-fonte). Roda com: node scripts/pixelate-logo.mjs
import sharp from "sharp";

const SRC = "src/assets/techs-community-logo.png";
const OUT = "src/assets/techs-community-logo-pixel.png";
const PIXEL_SIZE = 110; // grade de "pixels" antes de ampliar de volta
const FINAL_SIZE = 1254; // mesma resolução do arquivo original

// Paradas do duotone, da sombra mais escura ao brilho mais claro —
// tokens do sistema de cores retrô (global.css).
const STOPS = [
  { t: 0.0, hex: "#15131d" }, // --color-border / --color-text
  { t: 0.38, hex: "#6c2bd9" }, // --color-brand
  { t: 0.68, hex: "#2fcbc0" }, // --color-surface
  { t: 1.0, hex: "#e3fbf5" }, // --color-bg
];

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const stopsRgb = STOPS.map((s) => ({ t: s.t, rgb: hexToRgb(s.hex) }));

function duotoneColor(luma) {
  for (let i = 0; i < stopsRgb.length - 1; i++) {
    const a = stopsRgb[i];
    const b = stopsRgb[i + 1];
    if (luma >= a.t && luma <= b.t) {
      const f = (luma - a.t) / (b.t - a.t || 1);
      return a.rgb.map((v, idx) => Math.round(v + (b.rgb[idx] - v) * f));
    }
  }
  return stopsRgb[stopsRgb.length - 1].rgb;
}

async function main() {
  // 1) reduz para uma grade grosseira com vizinho-mais-próximo (sem
  //    suavização) — materializa o buffer intermediário, porque encadear
  //    dois .resize() na mesma pipeline do sharp colapsa em um só.
  const small = await sharp(SRC)
    .resize(PIXEL_SIZE, PIXEL_SIZE, { kernel: "nearest", fit: "fill" })
    .png()
    .toBuffer();

  // 2) amplia de volta do mesmo jeito (sem suavizar) — produz blocos de
  //    "pixel" nítidos em vez de uma imagem borrada.
  const pixelated = await sharp(small)
    .resize(FINAL_SIZE, FINAL_SIZE, { kernel: "nearest", fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = pixelated;
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = info.channels === 4 ? data[i + 3] : 255;
    const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const [dr, dg, db] = duotoneColor(luma);
    out[i] = dr;
    out[i + 1] = dg;
    out[i + 2] = db;
    if (info.channels === 4) out[i + 3] = a;
  }

  await sharp(out, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toFile(OUT);

  console.log(`Gerado ${OUT} (${info.width}x${info.height})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
