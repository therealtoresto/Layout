'use strict';

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const STATIC_PATH = path.join(process.cwd(), './static/');
const hostname = '127.0.0.1';
const port = 8000;

const routing = {
    '/': 'index.html',
    '/register': 'register.html',
    '/schedule': '/schedule.html',
    '/speakers': '/speakers.html',
};

const types = {
    string: s => s,
}

const MIME_TYPES = {
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript; charset=Utf-8',
    css:'text/css',
    png: 'image/png',
    ico: 'image/x-icon',
};

const serveFile = name => {
    const filePath = path.join(STATIC_PATH, name);
    if (!filePath.startsWith(STATIC_PATH)) {
        console.log(`Can't be served: ${name}`);
        return null;
    }
    const stream = fs.createReadStream(filePath);
    console.log(`Served: ${name}`);
    return stream;
};

const server = http.createServer((req, res) => {
    const name = req.url === '/' ? '/index.html' : req.url;
    const fileExt = path.extname(name).substring(1);
    const mimeType = MIME_TYPES[fileExt] || MIME_TYPES.html;
    res.writeHead(200, { 'Content-Type': mimeType });
    const stream = serveFile(name);
    if (stream) stream.pipe(res);
});

const start = () => server.listen(port, hostname, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = { start };