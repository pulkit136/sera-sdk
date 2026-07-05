import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  clean: true,
  minify: true,
  sourcemap: true,
  target: 'es2022',
  external: ['viem', 'ethers'],
  shims: true,
});
