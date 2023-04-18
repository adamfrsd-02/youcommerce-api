const createServer = require('./server'),
    http = require('http')

require('dotenv').config()


async function startServer() {
    const app = await createServer();
    http.createServer(app).listen(process.env.PORT || 3000, async () => {
        try {
            console.log(`server is running at port ${process.env.PORT}`)
        } catch (error) {
            console.log(error)
        }
    })
}

startServer()