const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        // we are using "return" to exit the function and not storing irrelevant data
        return res.status(400).json("incorrect submit form")
    }
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



}

// ES6 is not supported yet for node.js so we must use the older way to import and export modules
module.exports = {
    handleRegister: handleRegister
}