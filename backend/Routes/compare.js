// express router import
const express = require("express");
const router = express.Router();   //use for managing multiple routes

// amazon scraper for getting data from amazon scraper
const getAmazonData=require("../scrapers/amazon");
const getFlipkartData = require("../scrapers/flipkart");
const getCromaData=require("../scrapers/croma");
const getSnapdealData=require("../scrapers/snapdeal");




// for getting product from frontend and get it at route
router.get("/" ,async(req,res)=>{
    const {product}=req.query;   // getting product from frontend

    // check if product is passed
    if(!product){
        return res.status(400).json({error:"Product is required"});
    }

    try{
        const [amazonData, flipkartData, cromaData ,snapdealData] = await Promise.all([    //promise.all parallely dta fetch krne mai help krega
          getAmazonData(product),
          getFlipkartData(product),
          getCromaData(product),
          getSnapdealData(product)
        ]);

        // in future other website also add
        const result=[amazonData,flipkartData,cromaData,snapdealData];
        res.json(result); //send to the frontend
    }catch(error){
     console.error("error in compare route :" ,error);
     res.status(500).json({error:"Something went wrong"});
    }

});

module.exports=router;

