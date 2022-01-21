const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();

app.use(cors())

app.get('/getTimeStories',async(req,res) => {
    try {
        const {data} = await axios.get('https://time.com');
        let $ = cheerio.load(data)
        let links = []
        $(
          "body > div.homepage-wrapper > section.homepage-module.latest > ol > li > article > div > h2 > a"
        ).each((i, el) => {
          let title = $(el).text();
          let link = "https://time.com"+$(el).attr("href");
          links.push({ title, link });
        });
        return res.status(200).json(links);
    }catch(Err){
        console.log(Err);
        return res.status(200).send(null);
    }
})

app.listen(8080,() => {
    console.log('Time server on 8080');
})