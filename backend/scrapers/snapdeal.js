const axios = require("axios");
const cheerio = require("cheerio");

const getSnapdealData = async (product) => {
  const query = product.split(" ").join("%20");
  const url = `https://www.snapdeal.com/search?keyword=${query}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);

    const firstProduct = $(".product-tuple-listing").first();

    const title =
      firstProduct.find(".product-title").text().trim() || "Not Found";
    const price =
      firstProduct.find(".product-price").text().trim() || "Not Found";
    const relativeLink =
      firstProduct.find("a.dp-widget-link").attr("href") || "";
    const link = relativeLink.startsWith("http")
      ? relativeLink
      : `https://www.snapdeal.com${relativeLink}`;

    return {
      source: "Snapdeal",
      title,
      price,
      link,
    };
  } catch (error) {
    console.error("❌ Snapdeal Scraping Error:", error.message);
    return {
      source: "Snapdeal",
      title: "Not Found",
      price: "Not Found",
      link: "https://www.snapdeal.com",
    };
  }
};

module.exports = getSnapdealData;
