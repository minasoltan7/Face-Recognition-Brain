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



// starter database
const database = {
    users: [
        {
            id: "123",
            name: "john",
            email: "john@gmail.com",
            password: "cookies",
            "entries": 0,
            joined: new Date(),
        },
        {
            id: "124",
            name: "sally",
            email: "sally@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date(),
        }
    ]
}

app.get("/", (req, res) => {
    res.send("success");
})

app.post("/signin", (req, res) => {

    db.select('email', 'hash').from('login')
        .where('email', "=", req.body.email)
        .then(data => {
            // first we compare out hash from our login table, it gives true if valid
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                console.log(Boolean(data.length));
                // if the password is correct we are going to select the userdata from the user table
                db.select("*").from("users")
                    .where("email", "=", req.body.email)
                    .then(user => {
                        // user[0] because it is an array of objects
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json("unabe to get user"))
            } else {
                // if the password is not correct --->FALSE
                res.status(400).json("wrong credentials")
                console.log("false user")
            }
        })
        .catch(err => res.status(400).json("wrong credentials"))
})



app.post("/register", (req, res) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        }).into("login")
            .returning("email")
            .then(loginEmail => {
                return trx("users").insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                }).returning("*")
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)

    })
        .catch(err => {
            res.status(400).json("unable to join")
        })



})


app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    db.select("*").from("users").where({ id: id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json("User Not Found")
            }
        })
        .catch(err => {
            res.status(400).json("error getting user")
        })
})

app.put("/image", (req, res) => {
    const { id } = req.body;
    // we are going to increment the entries by 1 for the id that we received from the body
    // where("id","=",id) this is the syntax of sql 
    db("users").where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then(entries => res.json(entries[0]))
        .catch(err => {
            res.json("unable to get entries").status(400);
        })
})


app.listen(4000, () => {
    console.log("App is running on Port 4000");
}
)
