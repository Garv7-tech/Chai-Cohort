const http = require('http');

function getCallPr(res, route) {
    if (route === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('COHORT JS mein aapka swaagat hai');
    }
}

function postCallPr(res, route) {
    if (route === '/post') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('server ye le lo mujhse data');
    }
}

function serverBanao() {
    const server = http.createServer((req, res) => {
        switch (req.method) {
            case "GET":
                getCallPr(res, req.url);
                break;
            case "POST":
                postCallPr(res, req.url);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Method not supported');
        }
    });
    return server;
}

function aurphir(message) {
    console.log(message);
}

function suno(PORT) {
    const server = serverBanao();
    server.listen(PORT, () => aurphir(`server chal raha hai ${PORT} pe`));
}

module.exports = {
    serverBanao,
    suno,
    getCallPr,
    postCallPr
};
