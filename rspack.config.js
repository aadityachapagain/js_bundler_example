import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './src/index.ts', // Entry point of your application
    output: {
        filename: 'bundle.js', // Output file name
        path: path.resolve(__dirname, 'dist') // Output directory
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader', // Using ts-loader to handle TypeScript files
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // Loaders for CSS files
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'] // Resolving file extensions
    },
    optimization: {
        usedExports: true // Enable tree-shaking
    },
    mode: 'development' // Development mode
};
