const Nightmare = require("nightmare");

const BASE_URL = "https://news.ycombinator.com/newest";
let nightmare = null;

const ycombinator = {
  initialize: async () => {
    nightmare = Nightmare({ show: true });
  },

  getArticles: async (limit = 30) => {
    try {
      await nightmare.goto(BASE_URL);

      let articles = [];
      let isPagination = null;
      do {
        let newArticles = await nightmare.evaluate(() => {
          let tableRows = document.querySelectorAll(".itemlist > tbody > tr");

          let infoArticles = [];
          // GET ARTICLES WITH VANILLA JS
          for (let row of tableRows) {
            if (row.getAttribute("class") == "spacer") continue;
            if (row.getAttribute("class") == "athing") {
              let title = row.querySelector('td[class="title"] > a').innerText;
              let url = row
                .querySelector('td[class="title"] > a')
                .getAttribute("href");
              let source = row.querySelector(
                'span[class="sitebit comhead"] > a'
              )
                ? row.querySelector('span[class="sitebit comhead"] > a')
                    .innerText
                : false;

              let secondRow = row.nextSibling;

              let points = secondRow.querySelector(".score")
                ? secondRow.querySelector(".score").innerText
                : false;
              let author = secondRow.querySelector(".hnuser")
                ? secondRow.querySelector(".hnuser").innerText
                : false;
              let date = secondRow.querySelector(".age").innerText;
              let comments = secondRow.querySelectorAll("a")[2]
                ? secondRow.querySelectorAll("a")[2].innerText
                : false;

              infoArticles.push({
                title,
                url,
                source,
                points,
                author,
                date,
                comments
              });
            }
          }
          return infoArticles;
        });

        articles = [...articles, ...newArticles];

        isPagination = await nightmare.exists(".morelink");
        if (isPagination && articles.length < limit) {
          await nightmare.click(".morelink");
          await nightmare.wait(".itemlist > tbody > tr");
        }
      } while (articles.length < limit && isPagination);

      return articles.splice(0, limit);
    } catch (error) {
      console.log(`Something happened: ${error}`);
    }
  }
};

module.exports = ycombinator;
