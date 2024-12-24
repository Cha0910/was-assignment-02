
const path = require('path');

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
    },
    publicPath: '/was-assignment-02/',
    outputDir: 'dist',
});