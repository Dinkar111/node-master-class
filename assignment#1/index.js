
const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

var config = require('./lib/config')
var handlers = require('./lib/handlers')

// Create http server
var httpServer = http.createServer(function (req, res) {

    // get and parse url
    baseUrl = "http://" + req.headers.host + "/"
    reqUrl = new url.URL(req.url, baseUrl)
    var path = reqUrl.pathname

    // get method 
    var method = req.method

    // get headers
    var headers = req.headers

    // get params
    var params = reqUrl.searchParams

    // get payload body 
    var decoder = new StringDecoder('utf-8')
    var payload = ''
    req.on('data', (data) => {
        payload += decoder.write(data)
    })

    req.on('end', () => {
        payload += decoder.end()

        // request data object
        requestData = {
            'path': path,
            'method': method,
            'headers': headers,
            'params': params,
            'payload': payload
        }

        var chosenHandlers = typeof (router[path]) !== 'undefined' ? router[path] : handlers.notFound

        chosenHandlers(requestData, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200
            payload = typeof (payload) == 'object' ? payload : {}

            payloadString = JSON.stringify(payload)

            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode)
            res.end(payloadString)

        })
    })
})


// start server and listen to port 
httpServer.listen(config.port, () => console.log(`Server is running at ${config.port}`))

var router = {
    '/hello': handlers.hello
}