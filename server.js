const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    router = require('./routes'),
    mongoose = require('mongoose'),
    db = require('./models')
    
require('dotenv').config()

const createServer = async () => {
    const app = express();

    db.mongoose.connect(process.env.MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('connected to database')
    }).catch(err => {
        console.log('cannot connect to database', err)
        process.exit()
    })
    

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true}));
    app.use(cors());
    app.use('/api/v1/', router)

    app.get('*', (_, res) => res.status(404).json({
        'message' : 'not allowed!'
    }))

    return app
}

module.exports = createServer