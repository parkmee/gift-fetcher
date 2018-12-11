const Crawler = require("crawler");

const c = new Crawler({
  maxConnections: 10,
  callback: function(error, res, done) {
    let products = [];

    if (error) {
      console.error(error);
    } else {
      const $ = res.$;

      const getASIN = () => {
        return $("#result_" + i)[0].attribs["data-asin"];
      };

      let title = "";
      const getLongTitle = () => {
        title = $("#result_" + i + " .a-link-normal > h2")[0].attribs["data-attribute"];
        return title;
      };

      const getShortTitle = () => {
        if (title.length > 50) {
          return title.slice(0, 40) + "...";
        } else {
          return title;
        }
      };

      const getProductUrl = () => {
        const productUrl = $("#result_" + i + " .a-link-normal")[0].attribs.href;
        return productUrl + "&tag=giftfetcher-20";
      };

      const getProductImage = () => {
        return $("#result_" + i + " .a-link-normal")[0].children[0].attribs.src;
      };

      const getPrice = () => {
        const priceWhole = $("#result_" + i + " .sx-price-whole").text();
        const priceFraction = $("#result_" + i + " .sx-price-fractional").text();
        return parseFloat(priceWhole) + parseFloat(priceFraction / 100);
      };

      for (i = 3; i < 20; i++) {
        let product = {
          asin: getASIN(),
          description: getLongTitle(),
          title: getShortTitle(),
          productUrl: getProductUrl(),
          imageUrl: getProductImage(),
          price: getPrice()
        };

        products.push(product);
      }
      console.log(products);
      return products;
    }
    done();
  }
});

const searchProducts = searchTerms => {
  // Join search string with '+' sign
  const searchString = searchTerms.split(" ").join("+");
  console.log(searchString);

  // Amazon product search query
  const queryUrl = `https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${searchString}&tag=giftfetcher-20&sort=review-rank`;
  c.queue(queryUrl);
};

// testing
//searchProducts("cat toys");

module.exports = searchProducts;
