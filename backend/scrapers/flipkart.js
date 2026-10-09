const axios = require("axios");
const cheerio = require("cheerio");

async function getFlipkartData(product) {
  // const query = product.replace(" ", "+");
  const query = encodeURIComponent(product.trim());
  const url = `https://www.flipkart.com/search?q=${query}`;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0.0.0 Safari/537.36",
  };

  try {
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);
    console.log("Flipkart page title:", $("title").text());

    console.log(
      "Flipkart product HTML:",
      $("a[href*='/p/']")
        .slice(0, 2)
        .map((_, el) => $.html(el))
        .get(),
    );
    // Flipkart ke first product ka selector
    // const firstItem = $("div._1AtVbE").has("div._4rR01T").first();

    // const title = firstItem.find("div._4rR01T").text().trim();
    // const price = firstItem.find("div._30jeq3").text().trim();
    // // const link = "https://www.flipkart.com" + firstItem.find("a._1fQZEK").attr("href");
    // const href = firstItem.find("a._1fQZEK").attr("href");
    // const link = href ? new URL(href, "https://www.flipkart.com").href : null;
    const firstItem = $("a.k7wcnx[href*='/p/']").first();

    const title = firstItem.find("img").first().attr("alt")?.trim() || "";

    const priceMatch = firstItem.text().match(/₹\s*[\d,]+(?:\.\d{1,2})?/);

    const price = priceMatch ? priceMatch[0].replace(/\s+/g, "") : "";

    const href = firstItem.attr("href");

    const link = href ? new URL(href, "https://www.flipkart.com").href : null;
    return {
      source: "Flipkart",
      title: title || "Not Found",
      price: price || "Not Found",
      link: link,
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
