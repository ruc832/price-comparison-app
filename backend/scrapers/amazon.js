const axios=require("axios");
const cheerio=require("cheerio");


async function getAmazonData(product) {
    // URL QUERY
    const query=product.replace(" " , "+");   //in url of amazon etc when we search for any product in the url it  is writtern with + 
    // sign not with the space FOR EX IPHONE 15 IN url it is like IPHONE+15
    const url = `https://www.amazon.in/s?k=${query}`;

    //header used for amazon to understand that req is sent from user not by bot
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0.0.0 Safari/537.36",
    };
//     Mozilla/5.0	Compatibility identifier (har browser yahi deta hai)
// Windows NT 10.0	Tumhara OS — Windows 10
// Chrome/117.0.0.0	Tumhara browser — Chrome
// Safari/537.36	Rendering engine — Chrome me Safari engine ka base use hota hai

    
   try {
     const { data } = await axios.get(url, { headers }); //full html page of amazon product search
     const $ = cheerio.load(data); //convert html in jquery format
     const FirstItem = $(
       "div.s-main-slot div[data-component-type='s-search-result']"
     ).first(); //get the first item
     const title = FirstItem.find("h2 span").text().trim(); //h2 span has item text return the text trim remove extra space
     const price = FirstItem.find("span.a-price-whole").first().text().trim();
     const link =
       "https://www.amazon.in" + FirstItem.find("a.a-link-normal").attr("href");

     return {
       source: "Amazon",
       title: title || "Not Found",
       price: price ? `₹${price}` : "Not Found",
       link: link || "#",
     };
     } catch (error) {
     console.error("Amazon scraping failed:", error.message);
     return {
       source: "Amazon",
       title: "Error",
       price: "Error",
       link: "#",
     };
    }
    }

    module.exports= getAmazonData;