const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "d571468358fb4c82a8da41ff41100d1e"
})

const handleAPIcall = (req, res) => {
    const { input } = req.body
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, input)
        // this is the boundry_box
        // We are changing the empty state of the box with the new boundries calculated from the calculateFaceLocation function
        // We are are giving the calculateFaceLoaction function the coordinates given from the clarifay response
        // the response of the coordinates of the boundries given from Clarify function is not absolute so we are calculating the right coordiates to give to the CSS as Styles in absolute coordinate
        .then(data => res.send(data))
        .catch(err => res.status(400).send("unable to communicate with clarifai API"))

}

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
    handleImage: handleImage,
    handleAPIcall: handleAPIcall
}