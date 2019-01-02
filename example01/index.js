const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    getTitles(req, res);
}).listen(8000, '127.0.0.1');

function getTitles (req, res) {
    if (req.url === '/') {
        fs.readFile('./titles.json', (err, data) => {
            if (err) return hanError(err, res);
            getTemplate(JSON.parse(data.toString()), res);
        });
    }
}

function getTemplate (titles, res) {
    fs.readFile('./template.html', (err, data) => {
        if (err) return hanError(err, res);
        formatHtml(titles, data.toString(), res);
    });
}

function hanError (err, res) {
    console.error(err);
    res.end('Server Error');
}

function formatHtml (titles, tmpl, res) {
    const html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}