const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@App': path.resolve(__dirname, 'src/'),
      '@Assets': path.resolve(__dirname, 'src/assets/'),
    },
  },
}

export {}
