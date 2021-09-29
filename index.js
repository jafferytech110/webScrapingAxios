const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const express = require("express");
const PORT = 3000;

const app = express();

const url = "https://www.theguardian.com/uk";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const href = $(this).find("a").attr("href");
      articles.push({ title, href });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
