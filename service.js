const http = require('http');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
/*const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demoapp',{
    useNewUrlParser:true
})*/

app.use(morgan('dev'));
app.use(express.static('uploads')); //with base url and file name
// app.use('/uploads', express.static('uploads')); //in url we can put uploads/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin" , "*");
    res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods" , "PUT, POST, PATCH, DELETE, GET");     
        return res.status(200).json({});   
    }
    next();
})

// app.use('/', (req,res) => {
//     res.json({
//         message: 'hi'
//     })
// });


router.use(express.json());
router.use(express.urlencoded({extended:true}))

router.get('/getblog', (req,res,next) => {
    res.json({
        blogTitle:'Test title',
        blogContent:'Test blog content',
        blogAuthor:'Admin',
        blogDate:'12/27/2019'
    })
});

router.post('/addblog', (req,res,next) => {
    res.json({
        param: req.body
    })
});

app.use(router);

app.use((error,req,res,next) => {
    // const error = new Error('Not Found');
    error.status = error && error.status ? error.status : 404;
    error.message = error && error.message ? error.message : 'Not Found';
    
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error:{
            message : error.message
        }
    });
})

module.exports = app;  

/*const url = require('url');

exports.sampleRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name
    }

    var response = {
        "text": "Hello " + name
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

exports.testRequest = function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var response = {
            "text": "Post Request Value is  " + postBody.value
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};*/