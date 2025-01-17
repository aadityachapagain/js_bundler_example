## Bundling the JS project

### Webpack

You need to create a `webpack.config.js` file.

Fill the content of file with below code.

```js
import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.ts',  // Replace with your actual entry file
  target: 'node',
  mode: 'production',  // Change to 'development' if you want a completely unminified bundle
  output: {
    filename: 'bundle.mjs',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module',  // Use 'module' to generate ES module compatible output
    chunkFormat: 'module',    // Set chunkFormat to 'module'
  },
  experiments: {
    outputModule: true,  // Enable output as a module
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  externals: {
    // Exclude AWS SDK from the bundle since it's available in the Lambda runtime
    'aws-sdk': 'commonjs2 aws-sdk',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          beautify: true,  // Set to true to make the output more readable
          comments: false,  // Remove comments
        },
        compress: {
          drop_console: true,  // Remove console logs
        },
      },
    })],
    splitChunks: false,  // Disable code splitting
    concatenateModules: true,  // Enable module concatenation
  },
};

```

### esbuild config

```js
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

```

#### problem

This method cannot identify the packages which relies on old version of node and cannot resolve require statement from those packages into import statement.

Hence, you have to create a patching script to patch the bundled code to replace the require statement into import statement.

### Solution

Patching script

```js

import fs from "fs";

function fixVarName(data) {
    return data.replace(':', '__').replace('-', '_').replace('.', '_').replace('/', '_');
}

var arg = process.argv[2];
var data = !arg || arg == "-" ? fs.readFileSync(0, "utf-8") : fs.readFileSync(arg, "utf-8");;
var rx = /\b__require\("(fs\/promises|node\:crypto|_http_agent|_http_client|_http_common|_http_incoming|_http_outgoing|_http_server|_stream_duplex|_stream_passthrough|_stream_readable|_stream_transform|_stream_wrap|_stream_writable|_tls_common|_tls_wrap|assert|async_hooks|buffer|child_process|cluster|console|constants|crypto|dgram|diagnostics_channel|dns|domain|events|fs|http|http2|https|inspector|module|net|os|path|perf_hooks|process|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|trace_events|tty|url|util|v8|vm|wasi|worker_threads|zlib)"\)/gm;
var modules = new Map;
var out = data.replace(rx, function(req, mod) {
    var id = "__import_" + fixVarName(mod.toUpperCase());
    modules.set(mod, id);
    return id;
});
var imports_renamed = "";
modules.forEach(function(val, key) {
    console.log("import %s from %s;", fixVarName(val), JSON.stringify(key));
    imports_renamed += `import ${fixVarName(val)} from ${JSON.stringify(key)};\n`;
});

out = imports_renamed +"\n" + out;
fs.writeFileSync(arg, out);

```


#### plan of attack

- look into the bundeled code generated by esbuild
- search and find the require statement and add that entity inside regular expression of patching script.
- run the patching script against the bundled file.


#### running whole script

> node esbuild.config.mjs && cd dist/ && npm install && node importify-esbuild.js bundle.mjs