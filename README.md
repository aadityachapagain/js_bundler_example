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

### vite

TBA
