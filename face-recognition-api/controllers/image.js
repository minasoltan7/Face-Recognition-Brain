const handleImage = (req, res, db) => {
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
}

module.exports = {
    handleImage: handleImage
}