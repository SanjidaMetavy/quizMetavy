import express from "express"
import cors from "cors"
import mongoose from "mongoose"

// mongodb+srv://metavy007:<password>@cluster0.idq28yu.mongodb.net/?retryWrites=true&w=majority
// metavy007
// dZMw0DjTQscUslQo

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
//ismail 
//mongodb+srv://metavy007:dZMw0DjTQscUslQo@cluster0.idq28yu.mongodb.net/?retryWrites=true&w=majority/testschema
//mongodb://127.0.0.1:27017/testschema
//Sanjida
//mongodb+srv://metavy:uzDvAUTiSnkYTbs7@cluster0.eaws4q5.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://metavy:uzDvAUTiSnkYTbs7@cluster0.eaws4q5.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("successful DB connected ...")
    })
    .catch((err) => {
        console.log(err)
    });


//main Schema
const userSchema = new mongoose.Schema({
    user_id: {
        type:Number
        
    },
    results: [
        {
            Question: {
                type: String,
                
                required: true
            },
            correct_answer: {
                type: String,
                required: true
            },
            incorrect_answers:
                [{

                    Option_b: {
                        type: String,
                        required: true
                    },
                    Option_c: {
                        type: String,
                        required: true
                    },
                    Option_d: {
                        type: String,
                        required: true
                    }

                }]
        }
    ]

    //correct_option:String
    // email: String,
    // password: String

})

const User = new mongoose.model("User", userSchema)

//Routes
// app.post("/login", (req, res)=> {
//     const { email, password} = req.body
//     User.findOne({ email: email}, (err, user) => {
//         if(user){
//             if(password === user.password ) {
//                 res.send({message: "Login Successfull", user: user})
//             } else {
//                 res.send({ message: "Password didn't match"})
//             }
//         } else {
//             res.send({message: "User not registered"})
//         }
//     })
// }) 
// app.get("/getform",async(req,res)=>{
//       User.find({},(err,result)=>{
//         if(err){
//             res.send(err)
//         }
//         res.send(result)
//       })
//     })


app.post("/formdata", (req, res) => {
   

    const { Question, correct_answer, Option_b, Option_c, Option_d } = req.body
    //var arrayResult = [];
    var object = {
        Question,
        correct_answer,
        incorrect_answers: {
            Option_b,
            Option_c,
            Option_d
        }
    }

    const user = new User({

        user_id: 44,
        results: [object]
        // email,
        // password

    })
    user.save(err => {
       

        if (err) {
            res.send(err)
            // console.log("missing")
        } else {
            res.send({ message: "Successfully submited" });
            
        }
    })
  
//update
const updateFunc = async () => {
    await User.updateOne(
        { "user_id": 44 },
        { "$push": { "results": object } }
    );

}
updateFunc();


})


//server import part
import dotenv from "dotenv"; 

//dotenv.config({
    
//})

//port number
var port = process.env.PORT ||4000 ;
app.listen(port, () => {
    console.log(`BE started on port ${port}`)
});


//get data
app.get('/getting-data', (req, resp) => {

    User.findOne({ "user_id": 44 })
        .then((result) => {
            resp.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});