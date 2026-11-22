import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
// Opcode pack for bytes 0x00..0x53: char code - 35 = imm*16 + pops*4 + pushes; a space is no opcode.
const T = "#4d')-.2        ,,,,,,,(,,,(,,, ,,,             CGGC#           (,              ''$'";
const A = new Int8Array(256).fill(-1);
for (let i = 0; i < 84; i++) A[i] = T.charCodeAt(i) - 35;
function run(p, q) {
  const n = p.length, D = new Int32Array(256), C = new Int32Array(64), M = new Int32Array(256), O = new Uint8Array(65536);
  let s = 0, c = 0, o = 0, j = 0, g = 0;
  try {
    for (let t = 0; ;) {
      if (t === 1e6) throw 10;
      if (g < 0 || g >= n) throw 9;
      const e = p[g], k = A[e];
      if (k < 0) throw 5;
      const m = k >> 4;
      if (g + m >= n) throw 9;
      t++;
      if (s < (k >> 2 & 3)) throw 2;
      if (s - (k >> 2 & 3) + (k & 3) > 256) throw 3;
      const x = g + 1 + m;
      g = x;
      switch (e) {
        case 0: throw 0;
        case 1: D[s++] = (p[x - 1] << 24) >> 24; break;
        case 2: D[s++] = p[x - 4] | p[x - 3] << 8 | p[x - 2] << 16 | p[x - 1] << 24; break;
        case 3: s--; break;
        case 4: D[s] = D[s - 1]; s++; break;
        case 5: { const v = D[s - 1]; D[s - 1] = D[s - 2]; D[s - 2] = v; break; }
        case 6: D[s] = D[s - 2]; s++; break;
        case 7: { const v = D[s - 3]; D[s - 3] = D[s - 2]; D[s - 2] = D[s - 1]; D[s - 1] = v; break; }
        case 23: D[s - 1] = -D[s - 1] | 0; break;
        case 27: D[s - 1] = ~D[s - 1]; break;
        case 48: case 49: case 50: {
          const r = ((p[x - 2] | p[x - 1] << 8) << 16) >> 16;
          let take = e === 48;
          if (!take) take = (e === 49) === (D[--s] === 0);
          if (take) g = x + r;
          break;
        }
        case 51: if (c === 64) throw 7; C[c++] = x; g = p[x - 2] | p[x - 1] << 8; break;
        case 52: if (!c) throw 8; g = C[--c]; break;
        case 64: { const a = D[s - 1]; if (a < 0 || a > 255) throw 6; D[s - 1] = M[a]; break; }
        case 65: { const a = D[s - 1]; if (a < 0 || a > 255) throw 6; M[a] = D[s - 2]; s -= 2; break; }
        case 80: { const v = String(D[s - 1]); if (o + v.length > 65536) throw 11; s--; for (let i = 0; i < v.length; i++) O[o++] = v.charCodeAt(i); break; }
        case 81: if (o === 65536) throw 11; O[o++] = D[--s] & 255; break;
        case 82: D[s++] = j < q.length ? q[j++] : -1; break;
        case 83: throw D[--s] & 255;
        default: {
          const b = D[s - 1], a = D[s - 2];
          let r;
          if (e === 16) r = (a + b) | 0;
          else if (e === 17) r = (a - b) | 0;
          else if (e === 18) r = Math.imul(a, b);
          else if (e === 19) { if (!b) throw 4; r = a === -2147483648 && b === -1 ? a : (a / b) | 0; }
          else if (e === 20) { if (!b) throw 4; r = b === -1 ? 0 : (a % b) | 0; }
          else if (e === 21) { if (!b) throw 4; r = Math.floor((a >>> 0) / (b >>> 0)) | 0; }
          else if (e === 22) { if (!b) throw 4; r = (a >>> 0) % (b >>> 0) | 0; }
          else if (e === 24) r = a & b;
          else if (e === 25) r = a | b;
          else if (e === 26) r = a ^ b;
          else if (e === 28) r = a << (b & 31);
          else if (e === 29) r = a >> (b & 31);
          else if (e === 30) r = (a >>> (b & 31)) | 0;
          else if (e === 32) r = a === b ? 1 : 0;
          else if (e === 33) r = a < b ? 1 : 0;
          else r = (a >>> 0) < (b >>> 0) ? 1 : 0;
          D[s - 2] = r; s--;
        }
      }
    }
  } catch (code) {
    return { o: O.subarray(0, o), c: code };
  }
}
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input', Y = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for (const id of readdirSync(I).sort()) {
  const r = run(readFileSync(join(I, id, 'program.bin')), readFileSync(join(I, id, 'input.bin')));
  mkdirSync(join(Y, id), { recursive: true });
  writeFileSync(join(Y, id, 'stdout.bin'), r.o);
  writeFileSync(join(Y, id, 'exit.txt'), r.c + '\n');
}
