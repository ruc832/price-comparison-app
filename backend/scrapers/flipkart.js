const axios=require("axios");
const cheerio=require("cheerio");

async function getFlipkartData(product){
    const query = product.replace(" ", "+"); 
    const url=`https://www.flipkart.com/search?q=${query}`;

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0.0.0 Safari/537.36",
    };

try{
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    // Flipkart ke first product ka selector
    const firstItem = $("div._1AtVbE").has("div._4rR01T").first();

    const title = firstItem.find("div._4rR01T").text().trim();
    const price = firstItem.find("div._30jeq3").text().trim();
    const link = "https://www.flipkart.com" + firstItem.find("a._1fQZEK").attr("href");

    return {
      source: "Flipkart",
      title: title || "Not Found",
      price: price || "Not Found",
      link: link || "#",
    };
    } catch (error) {
    console.error("Flipkart scraping failed:", error.message);
    return {
      source: "Flipkart",
      title: "Error",
      price: "Error",
      link: "#",
    };
  }
}
module.exports = getFlipkartData;