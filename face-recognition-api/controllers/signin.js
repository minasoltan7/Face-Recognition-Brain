const handleSignin = (req, res, bcrypt, db) => {

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
}


module.exports = {
    handleSignin: handleSignin
}