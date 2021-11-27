const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
// because we are sending data from the front end in the form of JSON we need to parse the JSON data to JS in order to let express understand it
// we do this by using the next line middleware built in with express.js
app.use(express.json());
// We need cors to let chrome allow us to securely fetch our backend API server from our Front End 
const cors = require("cors");
app.use(cors());

const knex = require('knex');
// we are going to name Knew as "db" refering to our database
const db = knex({
    // Because we are using Postgres we chose "pg" as a client
    client: 'pg',
    connection: {
        // our localhost right nowbefore we deploy into an online plaform
        host: '127.0.0.1',
        // We must add the user name whith who we installed Postgres and its password in order for it to work
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");


app.get("/", (req, res) => {
    res.send("success");
})

app.post("/signin", (req, res) => {
    // we must inject whatever dependencies .handlerRegister() function needs 
    // req,res,db are the needed dependencies
    signin.handleSignin(req, res, bcrypt, db)
})



app.post("/register", (req, res) => {
    // we must inject whatever dependencies .handlerRegister() function needs 
    // req,res,db,bcrypt are the needed dependencies
    register.handleRegister(req, res, db, bcrypt)
})


app.get("/profile/:id", (req, res) => {
    // we must inject whatever dependencies .handlerRegister() function needs 
    // req,res,db are the needed dependencies
    profile.handleProfile(req, res, db)
})

app.put("/image", (req, res) => {
    // we must inject whatever dependencies .handlerRegister() function needs 
    // req,res,db are the needed dependencies
    image.handleImage(req, res, db)
})

app.post("/imageURL", (req, res) => {
    // we must inject whatever dependencies .handlerRegister() function needs 
    // req,res are the needed dependencies
    image.handleAPIcall(req, res);
})

app.listen(4000, () => {
    console.log("App is running on Port 4000");
}
)
