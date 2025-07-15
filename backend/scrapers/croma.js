const axios = require("axios");
const cheerio = require("cheerio");

const getCromaData = async (product) => {
  const query = product.split(" ").join("%20");
  const url = `https://www.croma.com/search/?text=${query}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);
    const firstProduct = $(".product-title").first();
    const title = firstProduct.text().trim();
    const link = "https://www.croma.com" + firstProduct.attr("href");
    const price = $(".pdpPrice").first().text().trim() || "Not Found";

    return {
      source: "Croma",
      title: title || "Not Found",
      price: price,
      link: link || "Not Found",
    };
  } catch (error) {
    console.error("Error scraping Croma:", error);
    return {
      source: "Croma",
      title: "Not Found",
      price: "Not Found",
      link: "Not Found",
    };
  }
};

module.exports = getCromaData;
