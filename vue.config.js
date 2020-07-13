module.exports = {
    publicPath: "",
    devServer: {
        host: "localhost",
        port: 9090,
        proxy: {
            "/mock": {
                target: "http://localhost:9090",
                ws: false,
                changeOrigin: false
            }
        }
    },
    configureWebpack : {
        performance: {
            hints:'warning',
            maxEntrypointSize: 50000000,
            maxAssetSize: 30000000,
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    }
}