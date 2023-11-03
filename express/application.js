const http = require('http');
const EventEmitter = require('events');




module.exports = class Application{
    constructor(){
        this.emitter = new EventEmitter()
        this.server = this.createServer();
        this.middlewares = []
    }

    use(middleware){
        this.middlewares.push(middleware)
    }

    listen(port, callback){
        this.server.listen(port, callback)
    }


    addRouter(router) {
        console.log(router);
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                this.emitter.on(this.getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res)
                })
            })
        })
    }

    createServer(){
        return http.createServer((req, res) => {
            let body = ""

            req.on("data", chunk => {
                body += chunk
            })
            
            req.on("end", () => {
                if(body){
                    req.body = JSON.parse(body)
                }

                this.middlewares.forEach(middleware => middleware(req, res))


                const emitted = this.emitter.emit(this.getRouteMask(req.pathname, req.method), req, res)
                if(!emitted){
                    res.end()
                }
            })
        })
    }

    getRouteMask(path, method){
        return `[${path}:${method}]`
    }
}
