module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
          normalizeUrl: false
        }),
    ]
}
