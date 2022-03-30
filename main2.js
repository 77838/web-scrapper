const request = require("request")
const cheerio = require("cheerio")
const puppeteer = require('puppeteer');
const internal = require("stream");
const fs = require("fs");



(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.flipkart.com/search?q=i%20phone%2013&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off');

    const linksarray = await page.evaluate(() => {

        let mobile = document.querySelectorAll("._1fQZEK")
        const mobilelist = [...mobile]

        let res = mobilelist.map((lnk, vval) => lnk.href)

        return res

    })

    // console.log(linksarray)
    let arr=[]

    for (let i = 0; i < linksarray.length; i++) {

        let newlink = linksarray[i]
        const url = newlink

        request(url, resp)

        function resp(err, response, html) {
            if (err)
                console.log(err)
            else
                extracthtm(html)
        }



        function extracthtm(html) {

            let parsehtml = cheerio.load(html)

            let names = parsehtml(".B_NuCI")
            let tempname = parsehtml(names[0]).text().trim()
            let color = tempname.split("(")
            let mobname = tempname.split("(")
            let storage = tempname.split(" ")
            let price = parsehtml("._30jeq3._16Jk6d")
            // let Specs = parsehtml(".a-section.a-spacing-medium.a-spacing-top-small")
            let rating = parsehtml("._2d4LTz").text()


            // let mobilename = parsehtml(mobname[0]).text().trim()
            let mobprice = parsehtml(price[0]).text()


            let nam=mobname[0]
            let internal = storage[storage.length-2]
            let clr = color[1].slice(0,color[1].indexOf(","))

            // console.log(`FLIPCART
            // `)
            // console.log(`Mobile Name =  ${mobname[0]}`)
            // console.log(`Mobile Storage = ${storage[storage.length-2]} GB`)
            // console.log(`Mobile Color = ${color[1].slice(0,color[1].indexOf(","))}`)
            // console.log(`Mobile price = ${mobprice}`)
            // //  console.log(`Mobile Specs = ${Specs}`)
            // console.log(`Mobile Rating = ${rating} out of 5
// _________________________`)

let mobileprice =mobprice.slice(1).split(",").join('')
arr.push({nam,mobileprice,internal,clr,rating})

fs.writeFileSync('./data2.json',JSON.stringify(arr))
// console.log(arr)

        }
    }



    await browser.close();
})();