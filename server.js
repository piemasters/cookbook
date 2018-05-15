//Install express server
const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();

// Replaced forced SSL with CloudFlare functionality

// If an incoming request uses a protocol other than HTTPS,
// redirect that request to the same url but with HTTPS
// const forceSSL = function() {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//         ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }
// };
// Instruct the app to use the forceSSL middleware
// app.use(forceSSL());

// Serve only the static files form the dist directory
// noinspection Annotator
app.use(express.static(__dirname + '/dist/cookbook'));

// Gzip
app.use(compression());

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/cookbook/index.html'));
});

// Start the app by listening on the default Heroku port
// noinspection Annotator
app.listen(process.env.PORT || 8080);
