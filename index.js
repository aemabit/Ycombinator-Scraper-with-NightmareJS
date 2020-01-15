const ycombinator = require("./ycombinator");

const night = async () => {
  try {
    await ycombinator.initialize();
    let articles = await ycombinator.getArticles(150);

    console.log(articles);
    debugger;
  } catch (error) {
    console.log(`Something happened: ${error}`);
  }
};

night();
