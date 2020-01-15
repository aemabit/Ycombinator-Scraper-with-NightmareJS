const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });

const night = async () => {
  try {
    await nightmare.goto("https://duckduckgo.com");
    await nightmare.type("#search_form_input_homepage", "github nightmare");
    await nightmare.click(".search__button.js-search-button");
    await nightmare.wait("#r1-0 a.result__a");
    let link = await nightmare.evaluate(
      () => document.querySelector("#r1-0 a.result__a").href
    );
    await nightmare.end()
    console.log(link);
  } catch (error) {
    console.log(`Something happened: ${error}`);
  }
};

night();
