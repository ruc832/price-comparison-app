require("dotenv").config;
const express =require("express");
const cors=require("cors");


const app=express();     // express app create hoga
const PORT=process.env.PORT || 4000;        // port jha server chlega


app.use(cors());            //core enable hoga
app.use(express.json());    //json request body parse krne k liye

//ROutes
const compareRoutes=require("./Routes/compare");   //compare route import hoga 
app.use("/compare",compareRoutes);                //use hoga



// test route
app.get("/",(req,res)=>{
    res.send("Server is Running");
});


// server listen on this port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});