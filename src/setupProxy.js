const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(createProxyMiddleware('/api/roles/create', { target: 'http://localhost:3002/api/roles/create' }));
	app.use(createProxyMiddleware('/api/roles/get', { target: 'http://localhost:3002/api/roles/get' }));
	app.use(createProxyMiddleware('/api/role/get', { target: 'http://localhost:3002/api/role/get' }));
};