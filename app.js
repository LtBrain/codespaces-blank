const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Serve static files from the `public` directory
app.use(express.static('public'));

// Proxy middleware for handling search requests
const proxy = createProxyMiddleware({
    target: 'https://www.google.com/search', // Target search engine
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '/search' // Rewrites `/proxy` to `/search`
    }
});

// Handle proxy requests
app.all('/proxy', (req, res) => {
    proxy(req, res);
});

// Start the server
app.listen(3000, () => {
    console.log('Search Proxy listening on port 3000');
});