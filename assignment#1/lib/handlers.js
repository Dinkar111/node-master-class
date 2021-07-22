
var handlers = {}

// if request with /hello route comes, then handle the route and send 200 status and success message
handlers.hello = function (requestData, callback) {
    callback(200, { "message": "Welcome to this node application" })
}

// if end point with the provided routes is not found, then send 404 status and not found error message
handlers.notFound = function (requestData, callback) {
    callback(404, { "error": "Not found" })
}

module.exports = handlers