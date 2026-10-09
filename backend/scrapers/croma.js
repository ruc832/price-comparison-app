const axios = require("axios");
const cheerio = require("cheerio");

const getCromaData = async (product) => {
  // const query = product.split(" ").join("%20");
  const query = encodeURIComponent(product.trim());
  const url = `https://www.croma.com/search/?text=${query}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);
    console.log("Croma page title:", $("title").text());
    console.log("Croma matches:", $(".product-title").length);
    console.log("Croma HTML sample:", $.html("body").slice(0, 1500));
    const firstProduct = $(".product-title").first();
    const title = firstProduct.text().trim();

    const href = firstProduct.attr("href");
    const link = href ? new URL(href, "https://www.croma.com").href : null;
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
