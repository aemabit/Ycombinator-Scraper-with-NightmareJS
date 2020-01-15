const Nightmare = require("nightmare");
const nightmare = Nightmare({
  show: true
  //   openDevTools: {
  //     mode: "detach"
  //   }
});

const night = async () => {
  try {
    await nightmare.viewport(1200, 600);
    await nightmare.goto("https://learnscraping.com/");

    let height = await nightmare.evaluate(() => document.body.scrollHeight);
    await nightmare.scrollTo(height, 0);

    // WAITS FOR A SPECIFIC SELECTOR TO BE FOUND ON A PAGE
    await nightmare.wait('#selector')

    // CLICKS ON A SELECTOR
    await nightmare.click('#selector')

    // TYPING JUST AS A NORMAL KEYBOARD WOULD
    await nightmare.type('#selector', 'STRING TO TYPE')

    // RETURN TRUE IF SELECTOR IS FOUND ON THE PAGE, ELSE FALSE
    let is_selector = await nightmare.exists('#selector')

    //  RETURN TRUE IF SELECTOR IS VISIVLE AND NOT HIDDEN, ELSE FALSE
    let is_visible = await nightmare.visible('#selector')

    //  RETURN CURRENT URL OF THE PAGE
    let current_url = await nightmare.url()

    // RETURNS THE CURRENT TITLE
    let current_title = await nightmare.title()

    // RETURN ARRAY WITH ALL THE COOKIES
    let cookies = await nightmare.cookies.get()


    debugger;
    //   await nightmare.end()
    console.log(link);
  } catch (error) {
    console.log(`Something happened: ${error}`);
  }
};

night();
