const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const debug = require('debug')('app');
const cors = require('cors');
const bodyParser = require('body-parser')();
const mongoose = require('mongoose');

const app = express();

const http = require('http'); 
const fs = require('fs'); // to get data from html file 
  
const server = http.createServer(function (req, res) { 
    res.writeHead(200, { 'Content-Type': 'text/html' }); 
  
    // req.url stores the path in the url 
    var url = req.url; 
    if (url === "/") { 
// fs.readFile looks for the HTML file 
// the first parameter is the path to the HTML page 
// the second is the call back function 
// if no file is found the function gives an error 
// if the file is successfully found, the content of the file are contained in pgres 
        fs.readFile("index.html", function (err, pgres) { 
            if (err) 
                res.write("HEAD.HTML NOT FOUND"); 
            else { 
                // The following 3 lines 
                // are reponsible for sending the html file 
                // and ends the response process 
                res.writeHead(200, { 'Content-Type': 'text/html' }); 
                res.write(pgres); 
                res.end(); 
            } 
        }); 
    }
}) 

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, '/views/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, '/views/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(bodyParser);
const corsOption = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOption));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");
const dbConfig = require("./app/config/db.config")
const Role = db.role;
//const PATH = mongodb+srv://Alchemist:<password>@health.zzdou.mongodb.net/<dbname>?retryWrites=true&w=majority;

db.mongoose.connect(/*`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}*/ `mongodb+srv://Alchemist:Alchemist22@health.zzdou.mongodb.net/alchemist_db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    console.log("Sucessfully connect to MongoDB.");
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});
app.get('/myHealthRec', (req, res) => {
    res.download('/dandi', myHealthRec, (err) => {
    console.error(err);
    });
});

app.use((req, res) => {
    res.status(404);
    res.send('Not Found');
});
app.use((req, res) => {
    res.status(500);
    res.send('Server Error')
})

app.listen(port, () => {
    debug(`app listening on port: ${chalk.greenBright(port)}`);
});
server.listen(port, () => { 
    console.log("SERVER STARTED PORT: 3000"); 
});
