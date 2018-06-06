module.exports = {
    entry: __dirname + "/src/index.ts",
    devtool: 'source-map',
    output: {
        path: __dirname + "/dist",
        filename: "index.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    compilerOptions: {
                        sourceMap: true,
                        declaration: true
                    }
                }
            }
        ]
    }
};