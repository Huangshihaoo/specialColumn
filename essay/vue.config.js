module.exports = {
    devServer: {
        proxy: 'http://127.0.0.1:4000'
    }
}

// {
//             '/api': {
//                 target: 'http://localhost:4000',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
        // }