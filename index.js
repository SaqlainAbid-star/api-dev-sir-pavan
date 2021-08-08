require("dotenv").config();
const express = require('express');

const app = express();

// configuration
app.use(express.json())

// mongoose connection
const connectDB = require("./connection")

// mongoose model
const userModel = require("./user")


// route:           /user/new
// description:     To add new user
// parameters:      none
// request body:    user object
app.post("/user/new", async (req,res)=>{
    try{
        const {newUser} = req.body;
        await userModel.create(newUser);
        return res.json({message: 'User Created'})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


// route:           /
// description:     To get all users
// parameters:      none
app.get('/', async (req,res)=>{
    try{
        const user = await userModel.find();
        return res.json({
            // message: "Success"
            user
        });
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

// route:           /user/type/:type
// description:     To get all users based on type
// parameters:      type
app.get('/user/type/:type', async (req,res)=>{
    try{
        const {type} = req.params;
        const user = await userModel.find({userType: type});
        if(!user){
            return res.json({message: "No User Found"})
        }
    
        return res.json({
            // message: "Success"
            user
        });
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


// route:           /user/:_id
// description:     To get a user based on id
// parameters:      id
app.get('/user/:_id', async (req,res)=>{
    try{
        const { _id } = req.params;
        const user = await userModel.findById(_id);
        if(!user){
            return res.json({message: "No User Found"})
        }
    
        return res.json({
            // message: "Success"
            user
        });
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


// route:           /user/update/:_id
// description:     To update a user based on id
// parameters:      id
// request body:    user object
app.put("/user/update/:_id", async (req,res)=>{
    try{
        const { _id } = req.params;
        const {userData} = req.body;
        const updateUser = await userModel.findByIdAndUpdate(
            _id,
            {$set: userData},
            {new: true}
        )
        return res.json({user: updateUser})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


// route:           /user/delete/:_id
// description:     To delete a user based on id
// parameters:      id
// request body:    none
app.delete("/user/delete/:_id", async (req,res)=>{
    try{
        const { _id } = req.params;
        await userModel.findByIdAndDelete(_id)
        return res.json({message: "User deleted!"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


// route:           /user/delete/:userType
// description:     To delete a user based on type
// parameters:      userType
// request body:    none
app.delete("/user/delete/type/:userType", async (req,res)=>{
    try{
        const { userType } = req.params;
        await userModel.findOneAndDelete({userType})
        return res.json({message: "User deleted!"})
    }catch(error){
        res.status(500).json({error: error.message})
    }

})


// app.post('/user/:id',(req,res)=>{
//     return res.json(req.params)
// })

app.listen(process.env.PORT,()=> 
    connectDB()
    .then((data)=>console.log("Server is Running"))
    .catch((error)=>console.log(error))
    );
