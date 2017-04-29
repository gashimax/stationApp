var http      = require('http');
var httpProxy = require('http-proxy');

httpProxy.createProxyServer({target: 'http://api.ekispert.jp'}).listen(5555);
