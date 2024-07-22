import { build } from 'esbuild';

const isProd = process.env.NODE_ENV === 'production';

build({
  outfile: './dist/bundle.mjs',
  entryPoints: ['./auth/authenticator.ts'],
  bundle: true,
  minify: false,
  sourcemap: !isProd,
  platform: 'node',
  target: 'node18',  // Ensure you're targeting Node.js 14.x, 16.x, or 18.x
  format: 'esm',     // Output as ES module
  external: [
    'aws-sdk',
  ],
}).then(() => {
  console.log('Build succeeded');
}).catch((e) => {
  console.log(e);
  process.exit(1);
});