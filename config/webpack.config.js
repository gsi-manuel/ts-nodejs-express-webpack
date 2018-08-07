const path = require('path');
const  fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


module.exports = {
    // the main source code file
    entry: './src/index.ts',                   
    output: {
        // the output file name
        filename: 'index.js',
        // the output path               
        // path: path.resolve(__dirname, 'dist')
    },
    target: "node",
    resolve: {
        extensions: [".ts", ".js"]
    },
    externals: nodeModules,
    module: {
        rules: [
          // all files with a `.ts` extension will be handled by `ts-loader`
            { 
            test: /\.ts$/, 
            loader: 'ts-loader',
            exclude: /node_modules/,
            }
        ]
    }
};
