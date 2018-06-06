module.exports = {
    entry: {
        router: __dirname + "/src/router.ts",
        shim: __dirname + "/src/shim/index.ts"
    },
    devtool: 'source-map',
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
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