
import serveStatic = require('serve-static');
import {createServer} from 'http';
const finalhandler = require('finalhandler');

// Serve up public/ftp folder
const serve = serveStatic('public/ftp', {
    index: ['index.html', 'index.htm']
});

// Create server
const server = createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
});

// Listen
server.listen(3000);
