//dependencies
const request = require("request");
const cheerio = require("cheerio");

module.exports = function(searchTerms, itemNumber) {
  let products = [];

  // Join search string with '+' sign
  const searchString = searchTerms.split(" ").join("+");
  console.log(searchString);

  // Amazon product search query
  const queryUrl = `https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${searchString}&tag=giftfetcher-20&sort=review-rank`;

  // get DOM content
  request(queryUrl, function(error, response, body) {
    setTimeout(() => {
      if (error) {
        return console.error(error);
      }

      if (response.statusCode === 200) {
        const $ = cheerio.load(body);

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
            return title.slice(0, 80) + "...";
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

        for (i = 3; i < itemNumber + 4; i++) {
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
    }, 3000);
  });
};

//test
//searchProducts("pink blanket", 3);

// alternate option - does not return all required variables

/* const AmazonProducts = require("crawl-amazon-products");
// Documentation https://www.npmjs.com/package/crawl-amazon-products

const searchProduct = searchTerms => {
  const searchString = searchTerms.split(" ").join("+");
  console.log(searchString);
  const queryURL = `https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=${searchString}&tag=giftfetcher-20&sort=review-rank`;

  AmazonProducts.getProducts(
    {
      url: queryURL,
      limit: 10
    },
    function(err, res) {
      if (err) throw err;
      console.log("check");
      console.log(res);
      return res;
    }
  );
};

module.exports = searchProduct;  */
