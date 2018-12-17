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
        // filename: '[name].bundle.js',
        // chunkFilename: '[name].bundle.js',
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
    },
    optimization: {
	    splitChunks: {
        chunks: 'all',
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 9,
                    enforce: true
                }
			}
		}
	},
};
