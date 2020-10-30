const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const debug = require('debug')('app');
const cors = require('cors');
const bodyParser = require('body-parser')();
const mongoose = require('mongoose');

const app = express();

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
