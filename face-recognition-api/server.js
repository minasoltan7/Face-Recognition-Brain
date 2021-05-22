const express= require("express");
const app = express();
app.use(express.json());

const database={
    users:[
        {
            id:"123",
            name:"john",
            email:"john@gmail.com",
            password:"cookies",
            "entries":0,
            joined:new Date(),
        },
        {
            id:"124",
            name:"sally",
            email:"sally@gmail.com",
            password:"bananas",
            entries:0,
            joined:new Date(), 
        }
    ]
}
app.get("/",(req,res)=>{
    res.send(database.users);
})

app.post("/signin",(req,res)=>{
    if(req.body.email===database.users[0].email &&
        req.body.password===database.users[0].password){
            res.json("successfully logged in");
        }else{
            res.status(400).send("error logging in");
        }
})



app.post("/register",(req,res)=>{

    const {email,password,name}=req.body;
    database.users.push({
        id:"125",
        name:name,
        email:email,
        password:password,
        entries:0,
        joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
})


app.get("/profile/:id",(req,res)=>{
    const{id}=req.params;
    
    let found =false;
    database.users.forEach((user)=>{
        // id coming from req.param is a string type so we are parsing it into Integer to match the database id 
        if(user.id===id){
            found=true;
            // we want to get out of the loop once we found that our id matches so we use return
            return res.json(user);
        }
    })
    
    if(found===false){
        res.status(400).json("user not found")
    }
})

app.put("/image",(req,res)=>{
    const {id}=req.body;
    let found =false;
    database.users.forEach(user=>{
        if(user.id===id){
            found=true;
            user.entries++;
            // we dont want to keep looping after we find the id so we return the entries to exit the for loop
            return res.json(user.entries);
        }
        if(!found){
            res.status(400).json("user not found")
        }

    })
})


app.listen(3000,()=>{
    console.log("App is running on Port 3000");
    }
    )
