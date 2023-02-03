const Blob = require('node-blob');
module.exports = async function generateHeader(params, pk) {
    var xhr_headers = {}
    contentLength = new Blob([encodeURI(params)]).size;
    xhr_headers["Accept-Language"] = 'en-US';
    xhr_headers["Accept-Encoding"] = "gzip, deflate";
    xhr_headers["Connection"] = "close";
    xhr_headers["Content-Length"] = contentLength;
    return xhr_headers;
}